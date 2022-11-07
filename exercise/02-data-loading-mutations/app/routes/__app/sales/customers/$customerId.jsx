/* eslint-disable no-unused-vars */
import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData, useParams } from "@remix-run/react";
import { getCustomerDetails } from "~/models/customer.server";
import { requireUser } from "~/session.server";
import { currencyFormatter } from "~/utils";

export default function CustomerRoute() {
  let customer = {
    id: "1",
    email: "hi@chance.dev",
    name: "Chance",
    invoiceDetails: [
      {
        id: 1,
        number: 1234,
        dueStatus: "paid",
        dueStatusDisplay: "PAID",
        totalAmount: 500,
      },
    ],
  };

  return (
    <div className="relative p-10">
      <div className="text-[length:14px] font-bold leading-6">
        {customer.email}
      </div>
      <div className="text-[length:32px] font-bold leading-[40px]">
        {customer.name}
      </div>
      <div className="h-4" />
      <div className="text-m-h3 font-bold leading-8">Invoices</div>
      <div className="h-4" />
      <table className="w-full">
        <tbody>
          {customer.invoiceDetails.map((invoiceDetails) => (
            <tr
              key={invoiceDetails.id}
              className="h-[56px] border-t border-gray-100 text-[14px]"
            >
              <td>
                <Link
                  className="text-blue-600 underline"
                  to={`../../invoices/${invoiceDetails.id}`}
                >
                  {invoiceDetails.number}
                </Link>
              </td>
              <td
                className={
                  "text-center uppercase" +
                  " " +
                  (invoiceDetails.dueStatus === "paid"
                    ? "text-green-brand"
                    : invoiceDetails.dueStatus === "overdue"
                    ? "text-red-brand"
                    : "")
                }
              >
                {invoiceDetails.dueStatusDisplay}
              </td>
              <td className="text-right">
                {currencyFormatter.format(invoiceDetails.totalAmount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
