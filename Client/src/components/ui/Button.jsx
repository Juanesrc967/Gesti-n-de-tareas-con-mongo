export function Button({ onClick, children }) {
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md 
                 hover:bg-red-700 hover:scale-105 transition-all duration-300 
                 disabled:bg-red-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
