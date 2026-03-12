import { useGame } from "../context/GameContext";
import { isHost } from "../utils/utils";
import Button from "../components/Button";
import { AnimatePresence, motion } from "motion/react";

const Lobby = () => {
  const { game, startGame } = useGame();
  return (
    <>
      <div className="flex flex-col justify-center gap-10">
        <h1 className="text-center font-extrabold text-zinc-50 text-8xl">
          BANK!
        </h1>
        <div className="drop-shadow-xl">
          <div className="bg-zinc-200 p-4 rounded-t-2xl text-center flex flex-col">
            <span className="text-sm text-zinc-400 font-bold">Game Code:</span>
            <span className="text-2xl font-bold text-gray-600">
              {game.code}
            </span>
          </div>
          <div className="w-full bg-gray-300 border-t border-gray-400/50 p-4 rounded-b-2xl flex flex-col gap-4 ">
            <div className="flex flex-col gap-1">
              <span className="uppercase text-xs font-semibold text-zinc-500">
                Players ({game.players.length})
              </span>
              <AnimatePresence>
                {game.players.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 font-bold uppercase bg-zinc-200 rounded-lg border border-slate-400/50 px-2 py-1"
                  >
                    {player.playerName}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {isHost(game) ? (
              <Button onClick={() => startGame(game.code)}>Start Game</Button>
            ) : (
              "Waiting on host..."
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
