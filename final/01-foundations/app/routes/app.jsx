import { Link, NavLink, Outlet } from "@remix-run/react";
import appStylesheetUrl from "../styles/app.css";

export function links() {
  return [{ rel: "stylesheet", href: appStylesheetUrl }];
}

export default function AppRoute() {
  return (
    <div className="app">
      <header className="app-head">
        <div>
          <Link to=".">
            <span>App</span>
          </Link>
          <nav aria-label="app" className="app-nav">
            <NavLink to="dashboard">Dashboard</NavLink>
            <NavLink to="expenses">Expenses</NavLink>
            <NavLink to="sales">Sales</NavLink>
          </nav>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
