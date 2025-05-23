import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { Icon } from "@iconify/react";
import favicon from "~/assets/favicon.png";
import type { Route } from "./+types/root";

import "./app.css";
import gridStyles from "./grid.module.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
  },
  {
    rel: "icon",
    href: favicon,
    type: "image/png",
  },
  {
    rel: "apple-touch-icon",
    href: favicon,
    type: "image/png",
  },
];

export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root" className={`${gridStyles.gridLayout} `}>
          {children}
          {/* <p className="copyright">{`©Corey Hatton ${new Date().getFullYear()}`}</p> */}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export const HydrateFallback = () => (
  <div>
    <Icon icon="eos-icons:loading" />{" "}
  </div>
);

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ?
        "The requested page could not be found."
      : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
