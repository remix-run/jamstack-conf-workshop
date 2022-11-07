import { json } from "@remix-run/node";
import { requireUser } from "~/session.server";

export async function loader({ request }) {
  await requireUser(request);
  return json({});
}

export default function Deposits() {
  return <div>Deposits. Cha-ching!</div>;
}
