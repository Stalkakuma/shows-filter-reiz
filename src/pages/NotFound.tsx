import { NavLink } from "react-router";

export const NotFound = () => {
  return (
    <p>
      Sorry, something went wrong: 404 - Not Found.{" "}
      <NavLink to="/" className="underline text-active-dark">
        Back to Home
      </NavLink>
    </p>
  );
};
