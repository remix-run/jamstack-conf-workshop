import { json } from "@remix-run/node";
import { requireUser } from "~/session.server";

export async function loader({ request }) {
  await requireUser(request);
  return json({});
}

export default function AccountsRoute() {
  return <div>Hope you have tons of accounts I guess.</div>;
}
