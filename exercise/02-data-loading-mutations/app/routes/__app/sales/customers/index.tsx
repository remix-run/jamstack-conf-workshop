/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUser } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  return json({});
}

export default function InvoiceIndex() {
  return <div className="p-10">Select a customer to see details</div>;
}
