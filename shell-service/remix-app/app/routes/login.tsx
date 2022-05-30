import {
  json,
  redirect,
  LoaderFunction,
  ActionFunction,
} from "@remix-run/node";
import { Form, useSearchParams } from "@remix-run/react";

import { getSession, commitSession, LOGGED_IN_SESSION_KEY } from "../sessions";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.get(LOGGED_IN_SESSION_KEY) === true) {
    return redirect("/");
  }

  return json({
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  session.set(LOGGED_IN_SESSION_KEY, true);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Login() {
  const [searchParams] = useSearchParams();

  return (
    <>
      <h2>Please Login</h2>
      <Form method="post">
        <button
          type="submit"
          // value={searchParams.get("redirectTo") ?? undefined}
        >
          OK
        </button>
      </Form>
    </>
  );
}
