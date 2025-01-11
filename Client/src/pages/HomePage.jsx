import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section
      className="min-h-screen flex justify-center items-center"
      style={{ backgroundColor: "#fae8d3" }}
    >
      <header className="bg-white p-10 rounded-lg shadow-2xl text-center max-w-lg border-t-8 border-orange-300 transform transition-transform duration-500 hover:scale-105">
        <h1 className="text-5xl py-2 font-bold text-gray-800 tracking-wide">
          ¡Bienvenido!
        </h1>
        <p className="text-md text-gray-600 mt-4 leading-relaxed">
          Bienvenidos al sistema de gestión de tareas, diseñado para facilitar
          la organización de las labores a realizar y sus fechas correspondientes.
          Por favor, regístrese si aún no lo ha hecho, o ingrese con sus credenciales si ya está registrado.
        </p>

        <Link
          className="transition-all duration-300 ease-in-out transform bg-orange-400 hover:bg-orange-500 hover:scale-110 text-white px-6 py-3 rounded-full mt-6 inline-block shadow-lg"
          to="/register"
        >
          Continuar
        </Link>
      </header>
    </section>
  );
}

export default HomePage;
