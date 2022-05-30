import { User } from "./types";

export const AuthBar = ({ user }: { user: User }) => {
  return <div>Hello {user?.username ?? "Nobody... go log in"}</div>;
};
