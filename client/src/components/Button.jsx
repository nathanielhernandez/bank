const Button = ({ onClick, children, ref }) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="border capitalize border-b-6 rounded-2xl bg-linear-to-t from-amber-500 to-amber-400 border-amber-700 py-4 shadow-lg text-xl inset-ring-1 inset-ring-amber-300 text-zinc-50 font-extrabold text-shadow-md active:border-b"
    >
      {children}
    </button>
  );
};

export default Button;
