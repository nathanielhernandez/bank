const NavButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-zinc-700 text-lg leading-none"
    >
      {children}
    </button>
  );
};

export default NavButton;
