import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  createGame,
  joinGame,
  startGame,
  addRoll,
  bankPlayer,
} from "./gameManager.js";
import "dotenv/config";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  console.log(`Server connected to client ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Server disconnected: ${socket.id}`);
  });

  socket.on("create-game", ({ playerName }, numRounds, callback) => {
    try {
      const game = createGame({ playerName, id: socket.id }, numRounds);
      socket.join(game.code);
      io.to(game.code).emit("game-state", game);
      callback({ game });
    } catch (error) {
      callback({ error: `Unable to create game: ${error.message}` });
    }
  });

  socket.on("join-game", ({ playerName }, gameCode, callback) => {
    // need to handle not allowing joining while game in progress
    try {
      const game = joinGame({ playerName, id: socket.id }, gameCode);
      socket.join(game.code);
      io.to(gameCode).emit("game-state", game);
      callback({ game });
    } catch (error) {
      callback({ error: `Unable to join game: ${error.message}` });
    }
  });

  socket.on("start-game", (gameCode, callback) => {
    // add   hostid check
    try {
      const game = startGame(gameCode, socket.id);
      io.to(gameCode).emit("game-state", game);
      callback({ game });
    } catch (error) {
      callback({ error: `Unable to start game: ${error.message}` });
    }
  });

  socket.on("add-roll", (gameCode, rollTotal, isDouble, callback) => {
    // add check if person adding role is current turn

    try {
      const game = addRoll(gameCode, rollTotal, isDouble, socket.id);
      io.to(gameCode).emit("game-state", game);
      callback({ game });
    } catch (error) {
      callback({ error: `Unable to roll: ${error.message}` });
    }
  });

  socket.on("bank-player", (gameCode, callback) => {
    // add check if person banking is the current turn player
    try {
      const game = bankPlayer(gameCode, socket.id);
      io.to(gameCode).emit("game-state", game);
      callback({ game });
    } catch (error) {
      callback({
        error: `Unable to bank player ${socket.id}: ${error.message}`,
      });
    }
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
