import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";

export function links() {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
}

export function meta() {
  return {
    charset: "utf-8",
    title: "Fakebooks Remix",
  };
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const unstable_shouldReload = ({ submission }) =>
  submission?.action === "/logout" || submission?.action === "/login";
