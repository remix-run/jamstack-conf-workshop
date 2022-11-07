import { Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { requireUser } from "~/session.server";

export async function loader({ request }) {
  await requireUser(request);
  return redirect("/sales/customers");
}

export default function IndexRoute() {
  return (
    <div>
      Go to the{" "}
      <Link className="text-blue-600 underline" to="sales">
        sales
      </Link>{" "}
      page...
    </div>
  );
}
