import { createCookieSessionStorage } from "@remix-run/node";

const LOGGED_IN_SESSION_KEY = "logged-in";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "shell_session",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
      sameSite: "lax",
      // secrets: ["s3cret1"],
      secure: false,
    },
  });

export { getSession, commitSession, destroySession, LOGGED_IN_SESSION_KEY };
