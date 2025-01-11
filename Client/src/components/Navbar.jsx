import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user);

  return (
    <nav className="bg-[#fae8d3] p-12 rounded x0l shadow-lg flex justify-between items-center border-t-8 border-orange-300">
      <h1 className="text-3xl font-bold text-gray-800">
        <Link to={isAuthenticated ? "/tasks" : "/"} className="hover:underline">
          Juanes.R.C
        </Link>
      </h1>
      <ul className="flex gap-x-4 items-center">
        {isAuthenticated ? (
          <>
            <li className="text-gray-700 text-sm font-semibold">
              Bienvenido, {user.username}
            </li>
            <li>
              <ButtonLink
                to="/add-task"
                className="bg-orange-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-orange-500 transition-all"
              >
                Añadir Tarea
              </ButtonLink>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => logout()}
                className="text-orange-500 font-semibold hover:underline"
              >
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink
                to="/login"
                className="bg-orange-400 text-black px-4 py-2 rounded-full shadow-md hover:bg-orange-500 transition-all"
              >
                Iniciar Sesión
              </ButtonLink>
            </li>
            <li>
              <ButtonLink
                to="/register"
                className="bg-orange-400 text-black px-4 py-2 rounded-full shadow-md hover:bg-orange-500 transition-all"
              >
                Registrarse
              </ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
