import { Form } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { inputClasses, LabelText, submitButtonClasses } from "~/components";
import { createCustomer } from "~/models/customer.server";
import { requireUser } from "~/session.server";

export async function action({ request }: ActionArgs) {
  await requireUser(request);
  let formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email");
  invariant(name && typeof name === "string", "name is required");
  invariant(email && typeof email === "string", "email is required");

  let customer = await createCustomer({ name, email });
  return redirect(`/sales/customers/${customer.id}`);
}

export default function NewCustomer() {
  return (
    <div className="relative p-10">
      <h2 className="font-display mb-4">New Customer</h2>
      <Form method="post" className="flex flex-col gap-4">
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
      </Form>
    </div>
  );
}
