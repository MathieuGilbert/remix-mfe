import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getSession, LOGGED_IN_SESSION_KEY } from "~/sessions";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.get(LOGGED_IN_SESSION_KEY) === true) {
    return json({ username: "Mathieu" });
  }

  return null;
};

export default function IndexRoute() {
  const user = useLoaderData();

  return (
    <div>
      Hello {user?.username ?? "Nobody... go log in"}
      <br />
      {user == null ? (
        <Link to="/login">Login</Link>
      ) : (
        <Link to="/logout">Logout</Link>
      )}
    </div>
  );
}
