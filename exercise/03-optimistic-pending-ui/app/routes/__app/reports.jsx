import { json } from "@remix-run/node";
import { requireUser } from "~/session.server";

export async function loader({ request }) {
  await requireUser(request);
  return json({});
}

export default function ReportsRoute() {
  return <div>Look at all these reports! Business!</div>;
}
