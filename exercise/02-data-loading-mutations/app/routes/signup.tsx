/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import * as React from "react";

import { getSession, getUserId } from "~/session.server";
import { createUser, getUserByEmail } from "~/models/user.server";
import { validateEmail } from "~/utils";
import { FullFakebooksLogo, inputClasses } from "~/components";

export function meta() {
  return {
    title: "Sing up for Fakebooks",
  };
}

export default function SignupPage() {
  let emailError: string | null = null;
  let passwordError: string | null = null;
  let passwordConfirmError: string | null = null;

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
