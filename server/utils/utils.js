export const shufflePlayers = (players) => {
  let currentIndex = players.length;
  let shuffledPlayers = [...players];

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffledPlayers[currentIndex], shuffledPlayers[randomIndex]] = [
      shuffledPlayers[randomIndex],
      shuffledPlayers[currentIndex],
    ];
  }

  return shuffledPlayers;
};

export const getNextPlayerIndex = (currentIndex, players) => {
  if (players.every((player) => player.isBanked))
    return Error("All players banked");
  const getNextIndex = (currentIndex) => {
    if (currentIndex + 1 >= players.length) {
      return 0;
    } else {
      return currentIndex + 1;
    }
  };

  let nextPlayerIndex = getNextIndex(currentIndex);

  while (players[nextPlayerIndex].isBanked) {
    nextPlayerIndex = getNextIndex(nextPlayerIndex);
  }

  return nextPlayerIndex;
};

export const endRound = (oldGameState, newGameState, nextPlayerIndex) => {
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
  return newGameState;
};
