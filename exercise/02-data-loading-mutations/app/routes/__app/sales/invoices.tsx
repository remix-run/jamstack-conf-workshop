/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUser } from "~/session.server";

export default function Invoices() {
  return <div>Invoices. Pay us!</div>;
}
