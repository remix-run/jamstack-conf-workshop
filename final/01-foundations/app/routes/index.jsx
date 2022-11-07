import { NavLink } from "@remix-run/react";

export function meta() {
  return {
    title: "Welcome to JamStack Conf!",
  };
}

export default function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to JamStack Conf!</h1>
      <nav aria-label="main">
        <NavLink to="/app">App</NavLink>
      </nav>
    </div>
  );
}
