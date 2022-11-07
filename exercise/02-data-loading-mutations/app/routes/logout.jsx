/* eslint-disable no-unused-vars */
import { redirect } from "@remix-run/node";

import { logout } from "~/session.server";
import { safeRedirect } from "~/utils";

export async function loader() {
  return redirect("/");
}
