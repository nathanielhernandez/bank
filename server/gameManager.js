/* Lots of repeating code - logic simplification planned */

import { shufflePlayers, getNextPlayerIndex, endRound } from "./utils/utils.js";

const games = new Map();

const generateGameCode = () => {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
};

export const createGame = (player, numRounds) => {
  const code = generateGameCode();
  const newPlayer = { ...player, score: 0, isBanked: false };
  const game = {
    code,
    hostId: player.id,
    players: [newPlayer],
    numRounds,
    round: 1,
    phase: "lobby",
    currentPlayerIndex: 0,
    currentRoundScore: 0,
    rollCount: 0,
  };
  games.set(code, game);
  return game;
};

export const joinGame = (player, gameCode) => {
  let oldGameState = games.get(gameCode);
  if (!oldGameState) throw Error(`Unable to find game with id ${gameCode}`);
  if (oldGameState.phase !== "lobby")
    throw Error(`Game with id ${gameCode} in progress, cannot join`);

  const newPlayer = { ...player, score: 0, isBanked: false };
  const newGameState = {
    ...oldGameState,
    players: [...oldGameState.players, newPlayer],
  };
  games.set(gameCode, newGameState);
  return newGameState;
};

export const startGame = (gameCode, requesterId) => {
  let oldGameState = games.get(gameCode);
  if (!oldGameState) throw Error(`Unable to find room with id ${gameCode}`);
  if (requesterId !== oldGameState.hostId)
    throw Error(`Must be host to start game`);
  if (oldGameState.players.length < 2)
    throw Error(`Must at least have two players to start game`);
  if (oldGameState.phase !== "lobby") throw Error(`Game in progress`);

  const shuffledPlayers = shufflePlayers(oldGameState.players);

  const newGameState = {
    ...oldGameState,
    players: shuffledPlayers,
    phase: "in-game",
  };

  games.set(gameCode, newGameState);
  return newGameState;
};

export const addRoll = (gameCode, rollTotal, isDouble, requesterId) => {
  // set returned game to oldStateGame
  let oldGameState = games.get(gameCode);
  // check if game exists
  if (!oldGameState) throw Error(`Unable to find game with id ${gameCode}`);
  if (oldGameState.phase !== "in-game") throw Error(`Currently not in-game`);
  if (oldGameState.players[oldGameState.currentPlayerIndex].id !== requesterId)
    throw Error("It's not your turn!");

  // destructure oldGameState to newGameState for updating
  let newGameState;

  // add check for all players banked
  let nextPlayerIndex = getNextPlayerIndex(
    oldGameState.currentPlayerIndex,
    oldGameState.players,
  );

  // check if we're live (on rolls 4+), handle not live logic
  if (oldGameState.rollCount < 3) {
    // logic can be simplified
    if (rollTotal === 7) {
      newGameState = {
        ...oldGameState,
        currentRoundScore: oldGameState.currentRoundScore + 70,
        rollCount: oldGameState.rollCount + 1,
        currentPlayerIndex: nextPlayerIndex,
      };
    } else {
      // update game state
      newGameState = {
        ...oldGameState,
        currentRoundScore: oldGameState.currentRoundScore + rollTotal,
        rollCount: oldGameState.rollCount + 1,
        currentPlayerIndex: nextPlayerIndex,
      };
    }
  } else {
    // live logic
    if (rollTotal === 7) {
      if (oldGameState.round + 1 > oldGameState.numRounds) {
        newGameState = {
          ...oldGameState,
          phase: "ended",
        };
      } else {
        // else
        // increase next player index
        newGameState = {
          ...oldGameState,
          players: oldGameState.players.map((player) => ({
            ...player,
            isBanked: false,
          })),
          currentPlayerIndex: nextPlayerIndex,
          round: oldGameState.round + 1,
          rollCount: 1,
          currentRoundScore: 0,
        };
      }
      // increase round number by 1
      // reset rollCount, roundScore
    } else if (isDouble) {
      newGameState = {
        ...oldGameState,
        currentRoundScore: oldGameState.currentRoundScore * 2,
        rollCount: oldGameState.rollCount + 1,
        currentPlayerIndex: nextPlayerIndex,
      };
    } else {
      newGameState = {
        ...oldGameState,
        currentRoundScore: oldGameState.currentRoundScore + rollTotal,
        rollCount: oldGameState.rollCount + 1,
        currentPlayerIndex: nextPlayerIndex,
      };
    }
    // need to check if game is over after roll
  }
  games.set(gameCode, newGameState);
  return newGameState;
};

export const bankPlayer = (gameCode, requesterId) => {
  // set returned game to oldStateGame
  let oldGameState = games.get(gameCode);

  // check if game exists
  if (!oldGameState) throw Error(`Unable to find game with id ${gameCode}`);
  if (oldGameState.phase !== "in-game") throw Error(`Currently not in-game`);
  if (oldGameState.players[oldGameState.currentPlayerIndex].id !== requesterId)
    throw Error("It's not your turn!");
  if (oldGameState.players[oldGameState.currentPlayerIndex].isBanked)
    throw Error(`Player ${requesterId} is already banked!`);

  const nextPlayerIndex = getNextPlayerIndex(
    oldGameState.currentPlayerIndex,
    oldGameState.players,
  );
  let newGameState;

  let updatedPlayers = oldGameState.players.map((player) =>
    player.id === requesterId
      ? {
          ...player,
          isBanked: true,
          score: player.score + oldGameState.currentRoundScore,
        }
      : player,
  );

  newGameState = {
    ...oldGameState,
    players: updatedPlayers,
    currentPlayerIndex: nextPlayerIndex,
  };

  if (newGameState.players.every((player) => player.isBanked)) {
    if (oldGameState.round + 1 > oldGameState.numRounds) {
      newGameState = { ...newGameState, phase: "ended" };
    } else {
      newGameState = {
        ...newGameState,
        players: newGameState.players.map((player) => ({
          ...player,
          isBanked: false,
        })),
        currentPlayerIndex:
          (oldGameState.currentPlayerIndex + 1) % oldGameState.players.length,
        round: oldGameState.round + 1,
        rollCount: 1,
        currentRoundScore: 0,
      };
    }
  }

  games.set(gameCode, newGameState);
  return newGameState;
};
