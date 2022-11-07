/* eslint-disable no-unused-vars */
import { json } from "@remix-run/node";
import { NavLink, Outlet, useLocation } from "@remix-run/react";
import { requireUser } from "~/session.server";

const subpages = ["subscriptions", "invoices", "customers", "deposits"];

export default function SalesRoute() {
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
          to="customers"
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

/**
 *
 * @param {{ isActive: boolean }} args
 * @returns
 */
function getLinkClassName({ isActive }) {
  return isActive ? "font-bold text-black" : "";
}
