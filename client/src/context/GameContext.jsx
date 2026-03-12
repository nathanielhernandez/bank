import socket from "../socket/socket";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { createActions } from "./actions";

export const GameContext = createContext(null);
export const GameDispatchContext = createContext(null);

const initialGame = {};

const gameReducer = (game, action) => {
  switch (action.type) {
    case "UPDATE_GAME": {
      return action.payload;
    }
    default: {
      throw Error(`Unknown action type: ${action.type}`);
    }
  }
};

const GameProvider = ({ children }) => {
  const [game, dispatch] = useReducer(gameReducer, initialGame);
  const [playerId, setPlayerId] = useState("");
  const actions = createActions(dispatch);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Client connected: ${socket.id}`);
      setPlayerId(socket.id);
    });

    socket.on("game-state", (game) => {
      dispatch({ type: "UPDATE_GAME", payload: game });
    });

    return () => {
      socket.off("connect");
      socket.off("game-state");
    };
  }, []);

  return (
    <GameContext.Provider value={{ game, playerId, ...actions }}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
export const useGameDispatch = () => useContext(GameDispatchContext);

export default GameProvider;
