/* eslint-disable no-unused-vars */
import { json } from "@remix-run/node";
import clsx from "clsx";
import { NavLink, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { SpinnerIcon } from "~/components";
import { getFirstCustomer } from "~/models/customer.server";
import { getFirstInvoice } from "~/models/invoice.server";
import { requireUser } from "~/session.server";
import { useDelayedLoadingState } from "~/utils";

export async function loader({ request }) {
  await requireUser(request);
  const [firstInvoice, firstCustomer] = await Promise.all([
    getFirstInvoice(),
    getFirstCustomer(),
  ]);
  return json({
    firstInvoiceId: firstInvoice?.id,
    firstCustomerId: firstCustomer?.id,
  });
}

const subpages = ["subscriptions", "invoices", "customers", "deposits"];

export default function SalesRoute() {
  let data = useLoaderData();
  let location = useLocation();

  let activeNavLink =
    location.pathname === "/sales"
      ? "overview"
      : subpages.find((subpage) =>
          location.pathname.startsWith(`/sales/${subpage}`),
        );

  return (
    <div className="relative h-full p-10">
      <h1 className="font-display text-d-h3 text-black">Sales</h1>
      <div className="h-6" />
      <div className="flex gap-4 border-b border-gray-100 pb-4 text-[length:14px] font-medium text-gray-400">
        <NavLink
          to="."
          className={getLinkClassName({
            isActive: activeNavLink === "overview",
          })}
        >
          Overview
        </NavLink>
        <NavLink
          to="subscriptions"
          className={getLinkClassName({
            isActive: activeNavLink === "subscriptions",
          })}
        >
          Subscriptions
        </NavLink>
        <NavLink
          to="invoices"
          className={getLinkClassName({
            isActive: activeNavLink === "invoices",
          })}
        >
          Invoices
        </NavLink>
        <NavLink
          to={
            data.firstCustomerId
              ? `customers/${data.firstCustomerId}`
              : "customers"
          }
          className={getLinkClassName({
            isActive: activeNavLink === "customers",
          })}
        >
          Customers
        </NavLink>
        <NavLink
          to="deposits"
          className={getLinkClassName({
            isActive: activeNavLink === "deposits",
          })}
        >
          Deposits
        </NavLink>
      </div>
      <div className="h-4" />
      <div className="relative">
        <Outlet />
      </div>
    </div>
  );
}

function Spinner({ visible }) {
  return (
    <div
      className={clsx(
        "pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 transition-opacity",
        {
          "opacity-0": !visible,
          "opacity-100": visible,
        },
      )}
    >
      <SpinnerIcon className={clsx("animate-spin")} height={160} width={160} />
    </div>
  );
}

function getLinkClassName({ isActive }) {
  return isActive ? "font-bold text-black" : "";
}
