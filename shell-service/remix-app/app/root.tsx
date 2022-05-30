import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { AuthBar } from "./auth";
import { NavBar } from "./navigation";
import { getSession, SESSION_KEYS } from "./sessions";
import { User } from "./types";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.get(SESSION_KEYS.loggedIn) === true) {
    const username = session.get(SESSION_KEYS.username);

    return json({ username });
  }

  return null;
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "MFE Shell",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const user = useLoaderData<User>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Remix MFE</h1>
        <hr />
        <AuthBar user={user} />
        <hr />
        <NavBar user={user} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {/* <LiveReload /> */}
      </body>
    </html>
  );
}
