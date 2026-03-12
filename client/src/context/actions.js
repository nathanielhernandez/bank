import socket from "../socket/socket";

export const createActions = (dispatch) => ({
  createGame: (playerName, numRounds = 10) => {
    socket.emit("create-game", { playerName }, numRounds, ({ game, error }) => {
      if (error) {
        console.error(error); //ui error handling
        return;
      }
      console.log(`Room created. Room number: ${game.code}`);
      dispatch({ type: "UPDATE_GAME", payload: game });
    });
  },

  joinGame: (playerName, gameCode) => {
    socket.emit("join-game", { playerName }, gameCode, ({ game, error }) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`Successfuly joined room ${gameCode}`);
      dispatch({ type: "UPDATE_GAME", payload: game });
    });
  },

  startGame: (gameCode) => {
    socket.emit("start-game", gameCode, ({ game, error }) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`Started game with code ${gameCode}`);
      dispatch({ type: "UPDATE_GAME", payload: game });
    });
  },

  addRoll: (gameCode, rollTotal, isDouble = false) => {
    socket.emit(
      "add-roll",
      gameCode,
      rollTotal,
      isDouble,
      ({ game, error }) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log(`Added roll ${rollTotal} to ${gameCode}`);
        dispatch({ type: "UPDATE_GAME", payload: game });
      },
    );
  },

  bankPlayer: (gameCode) => {
    socket.emit("bank-player", gameCode, ({ game, error }) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`Successfuly banked.`);
      dispatch({ type: "UPDATE_GAME", payload: game });
    });
  },
});
