import {
  json,
  redirect,
  LoaderFunction,
  ActionFunction,
} from "@remix-run/node";
import { Form, useSearchParams } from "@remix-run/react";

import { getSession, commitSession, SESSION_KEYS } from "../sessions";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.get(SESSION_KEYS.loggedIn) === true) {
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

  session.set(SESSION_KEYS.loggedIn, true);
  session.set(SESSION_KEYS.username, "Mathieu"); // still just hardcoded to me

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
