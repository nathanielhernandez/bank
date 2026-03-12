import { useGame } from "../context/GameContext";
import { isTurn, getCurrentPlayer } from "../utils/utils";
import { buttons } from "../utils/buttons";

const Game = () => {
  const { game, addRoll } = useGame();
  return (
    <>
      {isTurn(game) && (
        <div className="z-20 fixed left-0 bottom-0 bg-zinc-50 w-full grid grid-cols-4">
          {buttons.map((button) => (
            <button
              onClick={() => addRoll(game.code, button.value)}
              className="bg-amber-400 p-4"
            >
              {button.title}
            </button>
          ))}
        </div>
      )}
      <div className="relative flex flex-col gap-2">
        <div>
          Round {game.round}/{game.numRounds}
        </div>
        <div className="text-zinc-50 text-center">
          Score:
          <h1 className="font-extrabold text-6xl">{game.currentRoundScore}</h1>
        </div>
        {game.players.map((player) => (
          <div
            key={player.id}
            className={`p-4 bg-zinc-50 ${player.id === getCurrentPlayer(game).id && `border-l-8 border-red-500`}`}
          >
            {player.playerName}: {player.score}
          </div>
        ))}
        {!isTurn(game) && (
          <div className="fixed bottom-0 left-0 w-full bg-zinc-50">
            <button>Bank</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Game;
