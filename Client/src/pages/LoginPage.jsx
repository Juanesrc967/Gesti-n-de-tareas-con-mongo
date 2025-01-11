import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";
import { loginRequest } from "../api/auth"; // Importar la función para hacer la petición de login

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Estado para manejar el mensaje de error
  const [errorMessage, setErrorMessage] = useState("");

  // Función de submit
  const onSubmit = async (data) => {
    try {
      // Llamada a la función de loginRequest de auth
      await loginRequest(data);

      // Limpiar mensaje si el inicio de sesión es exitoso
      setErrorMessage(""); 

      // Actualizar el estado de isAuthenticated en el contexto
      signin(data); // Esto debe actualizar el estado isAuthenticated
    } catch (error) {
      // Manejar el error y mostrar mensaje
      setErrorMessage(error.response?.data?.message || "Usuario o contraseña incorrectos");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]); // Asegurarse de que useEffect esté viendo ambos valores

  return (
    <div
      className="h-[calc(100vh-100px)] flex items-center justify-center"
      style={{ backgroundColor: "#fae8d3" }}
    >
      <div className="bg-white p-12 rounded-xl shadow-2xl border-t-8 border-orange-300 max-w-lg w-full"> 
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Iniciar Sesión
        </h1>

        {/* Mostrar errores del backend si hay */}
        {loginErrors.length > 0 && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            <ul>
              {loginErrors.map((error, i) => (
                <li key={i} className="text-sm">{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Mostrar mensaje de error del usuario */}
        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
          {/* Campo de Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Correo Electrónico:
            </label>
            <input
              type="email"
              name="email"
              placeholder="youremail@domain.tld"
              {...register("email", { required: true })}
              className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 shadow-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
            )}
          </div>

          {/* Campo de Contraseña */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Escribe tu contraseña"
              {...register("password", { required: true, minLength: 6 })}
              className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 shadow-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Botón para enviar */}
          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-black py-3 rounded-full shadow-lg transition-all duration-300"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="flex justify-between text-gray-600 mt-6 text-sm">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="text-orange-500 hover:underline font-semibold"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
