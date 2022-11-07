/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUser } from "~/session.server";

export default function ExpensesRoute() {
  return <div>Hope you don't have a lot of these...</div>;
}
