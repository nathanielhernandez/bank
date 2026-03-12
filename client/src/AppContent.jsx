import { useGame } from "./context/GameContext";
import { useState } from "react";
import Landing from "./pages/Landing";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";

const AppContent = () => {
  const { game } = useGame();
  return (
    <div className="max-w-2xl m-auto p-8">
      {!game.phase && <Landing />}
      {game.phase === "lobby" && <Lobby />}
      {game.phase === "in-game" && <Game />}
    </div>
  );
};

export default AppContent;
