import { useMatches } from "@remix-run/react";
import { useMemo, useState, useEffect, useRef } from "react";

export const DelayedLoadingStates = {
  DELAY: "DELAY",
  DISPLAY: "DISPLAY",
  EXPIRE: "EXPIRE",
  IDLE: "IDLE",
};

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(id) {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  );
  return route?.data;
}

function isUser(user) {
  return user && typeof user === "object" && typeof user.email === "string";
}

export function useOptionalUser() {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser() {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeUser;
}

export function validateRedirect(to) {
  // Always validate redirect paths to avoid open-redirect vulnerabilities!
  return !!(
    to &&
    typeof to === "string" &&
    to.startsWith("/") &&
    !to.startsWith("//")
  );
}

export function validateEmail(email) {
  // This is not good email validation. If you steal this code and ship it to
  // production you will be in trouble!
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export function asUTC(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export function parseDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return asUTC(new Date(year, month - 1, day));
}

export function useDelayedLoadingState(loading, options = {}) {
  options = Object.assign({}, { delay: 250, minDuration: 200 }, options);
  let [state, setState] = useState("IDLE");
  let timeout = useRef(null);
  useEffect(() => {
    if (loading && state === "IDLE") {
      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => {
        if (!loading) {
          return setState("IDLE");
        }
        timeout.current = window.setTimeout(() => {
          setState("EXPIRE");
        }, options.minDuration);
        setState("DISPLAY");
      }, options.delay);
      setState("DELAY");
    }

    if (!loading && state !== "DISPLAY") {
      window.clearTimeout(timeout.current);
      setState("IDLE");
    }
  }, [loading, state, options.delay, options.minDuration]);

  useEffect(() => {
    return () => window.clearTimeout(timeout.current);
  }, []);

  return {
    state,
    isLoading: state === "DISPLAY" || state === "EXPIRE",
  };
}
