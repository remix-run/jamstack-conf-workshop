/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { inputClasses, LabelText, submitButtonClasses } from "~/components";
import { createCustomer } from "~/models/customer.server";
import { requireUser } from "~/session.server";

export default function NewCustomer() {
  return (
    <div className="relative p-10">
      <h2 className="font-display mb-4">New Customer</h2>
      <form method="post" className="flex flex-col gap-4">
        <div>
          <label htmlFor="name">
            <LabelText>Name</LabelText>
          </label>
          <input id="name" name="name" className={inputClasses} type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <LabelText>Email</LabelText>
          </label>
          <input
            id="email"
            name="email"
            className={inputClasses}
            type="email"
          />
        </div>

        <div>
          <button type="submit" className={submitButtonClasses}>
            Create Customer
          </button>
        </div>
      </form>
    </div>
  );
}
