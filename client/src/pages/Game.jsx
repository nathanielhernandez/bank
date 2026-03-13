import { useGame } from "../context/GameContext";
import { isTurn, getCurrentPlayer } from "../utils/utils";
import { buttons as rawButtons } from "../utils/buttons";
import Card from "../components/Card";
import Button from "../components/Button";

const Game = () => {
  const { game, addRoll, bankPlayer } = useGame();

  const buttons = rawButtons.map((button) => {
    if (game.isLive) {
      const isDisabled = button.title === "2" || button.title === "12";
      const color = button.title === "7" ? "red" : "amber";
      return { ...button, disabled: isDisabled, color };
    }

    const isDisabled = button.title === "Doubles";
    return { ...button, disabled: isDisabled, color: "amber" };
  });

  const playersSorted = game.players.sort((a, b) => b.score - a.score);
  return (
    <>
      <div
        layout
        className="w-screen max-w-2xl z-20 fixed bottom-0 left-1/2 -translate-x-1/2 bg-zinc-200 grid grid-cols-4 gap-2 p-2 rounded-t-2xl shadow-2xl"
      >
        {isTurn(game) &&
          buttons.map((button) => (
            <div
              className="flex flex-row"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
            >
              {button.title === "Doubles" ? (
                <Button
                  onClick={() => addRoll(game.code, 0, true)}
                  disabled={button.disabled}
                  color={button.color}
                  className="w-full"
                >
                  {button.title}
                </Button>
              ) : (
                <Button
                  onClick={() => addRoll(game.code, button.value)}
                  disabled={button.disabled}
                  color={button.color}
                  className="w-full"
                >
                  {button.title}
                </Button>
              )}
            </div>
          ))}

        <div>
          <div className="flex">
            <Button
              color={"green"}
              className={"px-6"}
              onClick={() => bankPlayer(game.code)}
            >
              Bank!
            </Button>
          </div>
        </div>
      </div>

      <div className="fixed w-screen top-0 left-0 h-10">
        <div className="grid grid-cols-3">
          <div className="flex flex-col justify-center">
            <div>Round</div>
            <div>
              {game.round}/{game.numRounds}
            </div>
          </div>
          <div className="bg-amber-400 text-zinc-50 rounded-2xl text-center px-4">
            Score:
            <h1 className="font-extrabold text-6xl">
              {game.currentRoundScore}
            </h1>
          </div>
          <div className="flex justify-center">
            {game.isLive ? <div>Live</div> : <div>Not Live</div>}
          </div>
        </div>
      </div>
      <div className="mt-10">
        {playersSorted.map((player) => (
          <div
            key={player.id}
            className={`p-4 bg-zinc-50 ${player.id === getCurrentPlayer(game).id && `border-l-8 border-red-500`}`}
          >
            {player.playerName}: {player.score}
          </div>
        ))}
      </div>
    </>
  );
};

export default Game;
