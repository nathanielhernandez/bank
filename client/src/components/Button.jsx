const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="border capitalize border-b-4 rounded-2xl bg-amber-500  border-amber-900 py-4 shadow-md text-xl text-amber-950 active:border-b"
    >
      {children}
    </button>
  );
};

export default Button;
