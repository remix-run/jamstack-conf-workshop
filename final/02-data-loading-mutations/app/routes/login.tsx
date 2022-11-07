import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { getSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
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
  let remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      {
        errors: {
          email: "Email is invalid",
          password: null,
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
        },
      },
      400,
    );
  }

  let user = await verifyLogin(email, password);
  if (!user) {
    return json(
      {
        errors: {
          email: "Invalid email or password",
          password: null,
        },
      },
      400,
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
    title: "Login to Fakebooks",
  };
}

export default function LoginPage() {
  let [searchParams] = useSearchParams();
  let redirectTo = searchParams.get("redirectTo") ?? "";
  let actionData = useActionData<typeof action>();
  let emailRef = React.useRef<HTMLInputElement>(null);
  let passwordRef = React.useRef<HTMLInputElement>(null);
  let emailError = actionData?.errors.email || null;
  let passwordError = actionData?.errors.password || null;

  React.useEffect(() => {
    if (emailError) {
      emailRef.current?.focus();
    } else if (passwordError) {
      passwordRef.current?.focus();
    }
  }, [emailError, passwordError]);

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
                autoComplete="current-password"
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
              className="w-full rounded bg-green-500 py-2 px-4 text-white hover:bg-green-600 focus:bg-green-400"
            >
              Log in
            </button>
          </div>
          <p className="text-center">
            New here?{" "}
            <Link to="/signup" className="underline">
              Sign up.
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
