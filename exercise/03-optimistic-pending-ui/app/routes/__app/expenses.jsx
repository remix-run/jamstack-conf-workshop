import { json } from "@remix-run/node";
import { requireUser } from "~/session.server";

export async function loader({ request }) {
  await requireUser(request);
  return json({});
}

export default function ExpensesRoute() {
  return <div>Hope you don't have a lot of these...</div>;
}
