import { useGame } from "../context/GameContext";
import { isHost } from "../utils/utils";
import Header from "../components/Header";
import Button from "../components/Button";
import Card from "../components/Card";
import LobbyPlayer from "../components/LobbyPlayer";

const Lobby = () => {
  const { game, startGame } = useGame();
  return (
    <>
      <div className="flex flex-col justify-center gap-10">
        <Header />
        <div className="drop-shadow-xl">
          <div className="bg-zinc-50 p-4 rounded-t-2xl text-center flex flex-col">
            <span className="text-sm text-zinc-500 font-bold uppercase">
              Game Code:
            </span>
            <span className="text-2xl font-bold text-gray-600">
              {game.code}
            </span>
          </div>
          <div className="w-full bg-gray-200 border-t border-gray-400/50 p-4 rounded-b-2xl flex flex-col gap-4 ">
            <div className="flex flex-col gap-1">
              <span className="uppercase text-xs font-semibold text-zinc-500">
                Players ({game.players.length})
              </span>

              {game.players.map((player) => (
                <LobbyPlayer key={player.id} name={player.playerName} />
              ))}
            </div>
            {isHost(game) ? (
              <Button onClick={() => startGame(game.code)}>Start Game</Button>
            ) : (
              <span className="text-center font-bold uppercase text-sm text-zinc-600 animate-pulse">
                Waiting on host...
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
