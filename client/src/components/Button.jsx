const colorMap = {
  amber: "from-amber-500 to-amber-400 border-amber-700 inset-ring-amber-300",
  blue: "from-blue-500 to-blue-400 border-blue-700 inset-ring-blue-300",
  red: "from-red-500 to-red-400 border-red-700 inset-ring-red-300",
  green: "from-green-500 to-green-400 border-green-700 inset-ring-green-300",
};

const Button = ({
  onClick,
  children,
  className,
  disabled,
  color = "amber",

  ref,
}) => {
  const cssColor = colorMap[color] ?? colorMap.amber;

  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={
        `border capitalize border-b-6 rounded-2xl bg-linear-to-t py-4 shadow-lg text-xl inset-ring-1 text-zinc-50 font-extrabold text-shadow-md  ` +
        cssColor +
        (disabled ? " opacity-50" : "") +
        " " +
        (className ?? "")
      }
    >
      {children}
    </button>
  );
};

export default Button;
