/* eslint-disable no-unused-vars */
import { json } from "@remix-run/node";
import { requireUser } from "~/session.server";

export async function loader({ request }) {
  return json({});
}

export default function InvoiceIndex() {
  return <div className="p-10">Select a customer to see details</div>;
}
