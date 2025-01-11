import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link
    to={to}
    className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-300"
  >
    {children}
  </Link>
);
