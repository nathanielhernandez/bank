import socket from "../socket/socket";

export const isHost = (game) => {
  if (!game || !socket) return;

  return game.hostId === socket.id;
};

export const isTurn = (game) => {
  if (!game || !socket) return;

  return game.players[game.currentPlayerIndex].id === socket.id;
};

export const getCurrentPlayer = (game) => {
  if (!game || !socket) return;

  return game.players[game.currentPlayerIndex];
};
