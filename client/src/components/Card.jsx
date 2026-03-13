const Card = ({ children }) => {
  return (
    <div className="w-full bg-zinc-50 p-4 rounded-2xl drop-shadow-xl">
      {children}
    </div>
  );
};

export default Card;
