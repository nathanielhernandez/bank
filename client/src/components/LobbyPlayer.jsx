const LobbyPlayer = ({ key, name }) => {
  return (
    <div
      key={key}
      className="flex items-center gap-2 font-bold uppercase bg-zinc-100 rounded-lg border border-slate-400/50 px-2 py-1"
    >
      {name}
    </div>
  );
};

export default LobbyPlayer;
