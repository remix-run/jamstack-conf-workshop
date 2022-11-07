/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { logout } from "~/session.server";
import { safeRedirect } from "~/utils";

export async function loader() {
  return redirect("/");
}
