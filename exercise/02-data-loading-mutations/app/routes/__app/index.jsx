/* eslint-disable no-unused-vars */
import { redirect } from "@remix-run/node";

export async function loader({ request }) {
  return redirect("/sales/customers");
}
