import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

export function meta() {
  return {
    charset: "utf-8",
    title: "Welcome to JamStack Conf!",
  };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="root">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </div>
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error?.message || "We're working on it!"}</p>
    </div>
  );
}

export function CatchBoundary() {
  let caught = useCatch();
  return (
    <div>
      <h1>{caught.status}</h1>
      <p>{caught.statusText}</p>
    </div>
  );
}
