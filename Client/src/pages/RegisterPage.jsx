import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div
      className="h-[calc(100vh-10px)] flex items-center justify-center bg-[#fae8d3]"
    >
      <div className="bg-white p-12 rounded-xl shadow-2xl border-t-8 border-orange-300 max-w-lg w-full"> 
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Registrarse
        </h1>

        {/* Mostrar errores de registro si hay */}
        {registerErrors.length > 0 && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            <ul>
              {registerErrors.map((error, i) => (
                <li key={i} className="text-sm">{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
          {/* Campo de Nombre de Usuario */}
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Nombre de Usuario:
            </label>
            <input
              type="text"
              name="username"
              placeholder="Escribe tu nombre"
              {...register("username")}
              className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 shadow-sm"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-2">{errors.username.message}</p>
            )}
          </div>

          {/* Campo de Correo Electrónico */}
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
              {...register("email")}
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
              placeholder="********"
              {...register("password")}
              className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 shadow-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
            )}
          </div>

          {/* Campo de Confirmar Contraseña */}
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Confirmar Contraseña:
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              {...register("confirmPassword")}
              className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 shadow-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Botón para enviar */}
          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-black py-3 rounded-full shadow-lg transition-all duration-300"
          >
            Registrarse
          </button>
        </form>

        <p className="flex justify-between text-gray-600 mt-6 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:underline font-semibold"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
