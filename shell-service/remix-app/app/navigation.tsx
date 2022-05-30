import { NavLink } from "@remix-run/react";
import { User } from "./types";

export const NavBar = ({ user }: { user: User }) => {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    fontWeight: isActive ? "bold" : "normal",
    backgroundColor: isActive ? "lightgray" : "transparent",
    color: isActive ? "blue" : "black",
  });

  const actionStyle = () => ({
    color: "red",
  });

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" style={linkStyle}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/waffles" style={linkStyle}>
            Waffles
          </NavLink>
        </li>
        <li>
          <NavLink to="/pancakes" style={linkStyle}>
            Pancakes
          </NavLink>
        </li>
        <li>
          {user == null ? (
            <NavLink to="/login" style={actionStyle}>
              Login
            </NavLink>
          ) : (
            <NavLink to="/logout" style={actionStyle}>
              Logout
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};
