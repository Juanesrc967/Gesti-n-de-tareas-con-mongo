export function Label({ htmlFor, children }) {
    return (
      <label htmlFor={htmlFor} className=" block my-4 text-slate-300 mx-auto text-center text-1x1">
        {children}
      </label>
    );
  }
  