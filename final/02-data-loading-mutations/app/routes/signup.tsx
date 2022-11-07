import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { getSession, getUserId } from "~/session.server";
import { createUser, getUserByEmail } from "~/models/user.server";
import { validateEmail } from "~/utils";
import { FullFakebooksLogo, inputClasses } from "~/components";

export async function loader({ request }: LoaderArgs) {
  let userId = await getUserId(request);
  if (userId) {
    return redirect("/");
  }
  return json({});
}

export async function action({ request }: ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let passwordConfirm = formData.get("passwordConfirm");
  let remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      {
        errors: {
          email: "Email is invalid",
          password: null,
          passwordConfirm: null,
        },
      },
      400,
    );
  }

  if (!password || typeof password !== "string") {
    return json(
      {
        errors: {
          email: null,
          password: "Password is required",
          passwordConfirm: null,
        },
      },
      400,
    );
  }
  if (password.length < 8) {
    return json(
      {
        errors: {
          email: null,
          password: "Password is too short",
          passwordConfirm: null,
        },
      },
      400,
    );
  }
  if (passwordConfirm !== password) {
    return json(
      {
        errors: {
          email: null,
          password: null,
          passwordConfirm: "Passwords do not match",
        },
      },
      400,
    );
  }

  let existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
          passwordConfirm: null,
        },
      },
      400,
    );
  }

  let user = await createUser(email, password);
  if (!user) {
    return json(
      {
        errors: {
          email: "Something went wrong",
          password: null,
          passwordConfirm: null,
        },
      },
      500,
    );
  }

  let session = await getSession(request);
  session.set("userId", user.id);
  return redirect("/sales", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge:
          remember === "on"
            ? 60 * 60 * 24 * 7 // 7 days
            : undefined,
      }),
    },
  });
}

export function meta() {
  return {
    title: "Sing up for Fakebooks",
  };
}

export default function LoginPage() {
  let [searchParams] = useSearchParams();
  let redirectTo = searchParams.get("redirectTo") ?? "";
  let actionData = useActionData<typeof action>();
  let emailRef = React.useRef<HTMLInputElement>(null);
  let passwordRef = React.useRef<HTMLInputElement>(null);
  let passwordConfirmRef = React.useRef<HTMLInputElement>(null);

  let emailError = actionData?.errors.email;
  let passwordError = actionData?.errors.password;
  let passwordConfirmError = actionData?.errors.passwordConfirm;

  React.useEffect(() => {
    if (emailError) {
      emailRef.current?.focus();
    } else if (passwordError) {
      passwordRef.current?.focus();
    } else if (passwordConfirmError) {
      passwordConfirmRef.current?.focus();
    }
  }, [emailError, passwordError, passwordConfirmError]);

  return (
    <div className="flex min-h-full flex-col justify-center">
      <h1 className="mb-12">
        <FullFakebooksLogo size="lg" position="center" />
      </h1>
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={emailError ? true : undefined}
                aria-errormessage={emailError ? "email-error" : undefined}
                className={inputClasses}
              />
              {emailError && (
                <div className="pt-1 text-red-700" id="email-error">
                  {emailError}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="off"
                aria-invalid={passwordError ? true : undefined}
                aria-errormessage={passwordError ? "password-error" : undefined}
                className={inputClasses}
              />
              {passwordError && (
                <div className="pt-1 text-red-700" id="password-error">
                  {passwordError}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="passwordConfirm"
                ref={passwordConfirmRef}
                name="passwordConfirm"
                type="password"
                autoComplete="off"
                aria-invalid={passwordConfirmError ? true : undefined}
                aria-errormessage={
                  passwordConfirmError ? "password-confirm-error" : undefined
                }
                className={inputClasses}
              />
              {passwordConfirmError && (
                <div className="pt-1 text-red-700" id="password-confirm-error">
                  {passwordConfirmError}
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <button
              type="submit"
              className="w-full rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Sign Up
            </button>
          </div>
          <p className="text-center">
            Already a user?{" "}
            <Link to="/login" className="underline">
              Log in.
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
