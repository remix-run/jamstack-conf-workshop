/* eslint-disable no-unused-vars */
import { json } from "@remix-run/node";
import { requireUser } from "~/session.server";

export default function DashboardRoute() {
  return <div>Look at all these graphs!</div>;
}
