import { useGame } from "../context/GameContext";
import { isHost } from "../utils/utils";

const Lobby = () => {
  const { game, startGame } = useGame();
  return (
    <div className="flex flex-col justify-center gap-10">
      <h1 className="text-center font-extrabold text-zinc-50 text-8xl">
        BANK!
      </h1>
      <div className="w-full bg-zinc-200 p-4 rounded-2xl flex flex-col gap-4 drop-shadow-xl">
        Players
        {game.players.map((player) => (
          <div>{player.playerName}</div>
        ))}
        {isHost(game) ? (
          <button onClick={() => startGame(game.code)}>Start Game</button>
        ) : (
          "Waiting on host..."
        )}
      </div>
    </div>
  );
};

export default Lobby;
