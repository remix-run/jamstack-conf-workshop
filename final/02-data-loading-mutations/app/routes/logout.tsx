import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSession } from "~/session.server";

export async function action({ request }: ActionArgs) {
  let session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function loader() {
  return redirect("/");
}
