/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUser } from "~/session.server";

export default function ReportsRoute() {
  return <div>Look at all these reports! Business!</div>;
}
