let readline = require("readline-sync");

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }
  toString() {
    return this.marker;
  }
  setMarker(marker) {
    this.marker = marker;
  }
  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
  getMarker() {
    return this.marker;
  }
  resetMarker() {
    this.marker = Square.UNUSED_SQUARE;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }
  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"].marker}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }
  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  usedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => !this.squares[key].isUnused());
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }
  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }

  reset() {
    for (const key in this.squares) {
      this.squares[key].resetMarker();
    }
  }

}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  getScore() {
    return this.score;
  }

  increaseScore() {
    this.score += 1;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];

  static MATCH_OVER = 3;

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    this.displayWelcomeMessage();
    this.playMatch();
    this.displayGoodbyeMessage();
  }

  playMatch() {
    console.log(`First player to ${TTTGame.MATCH_OVER} games is the winner!`);
    while (true) {
      this.oneGame();

      let matchWinner = this.determineMatchWinner();
      if (matchWinner) {
        this.displayMatchWinner(matchWinner);
        break;
      }

      if (!this.playAgain()) break;

    }
  }

  oneGame() {
    this.board.reset();
    this.board.display();
    let currentPlayer = this.firstPlayer();

    while (true) {
      this.playerMoves(currentPlayer);
      if (this.gameOver()) break;
      this.board.displayWithClear();
      currentPlayer = this.togglePlayer(currentPlayer);
    }
    this.board.displayWithClear();
    let winner = this.determineWinner();
    this.displayGameResults(winner);
    this.updateScore(winner);
    this.displayMatchResults();
  }

  firstPlayer() {
    let coin = Math.floor(Math.random() * 2);

    if (coin === 0) {
      return this.human;
    } else {
      return this.computer;
    }
  }

  togglePlayer(currentPlayer) {
    if (currentPlayer === this.human) {
      return this.computer;
    } else {
      return this.human;
    }
  }

  playerMoves(currentPlayer) {
    if (currentPlayer === this.human) {
      console.log('Your turn to go!');
      this.humanMoves();
    } else {
      this.computerMoves();
    }
  }

  displayMatchResults() {
    console.log(`Current Match Results:
    Human: ${this.human.getScore()} vs. Computer: ${this.computer.getScore()}`);
  }

  playAgain() {
    let answer;
    const VALID_ANSWERS = ['y', 'n'];

    while (true) {
      const prompt = 'Would you like to play again? (y/n) ';
      answer = readline.question(prompt);

      if (VALID_ANSWERS.includes(answer.toLowerCase())) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    if (answer.toLowerCase() === 'y') {
      return true;
    } else {
      return false;
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log(`your choice: ${choice}`);
      console.log(`${validChoices}`);
      console.log("");
    }
    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice = this.computerMoveChoices(validChoices);
    if (!choice) {
      do {
        choice = Math.floor((9 * Math.random()) + 1).toString();
      } while (!validChoices.includes(choice));
    }
    this.board.markSquareAt(choice, this.computer.getMarker());
  }


  computerMoveChoices(unusedSpots) {

    let offensiveChoiceRow = this.winningOrAtRiskRow(this.computer);
    let offensiveChoiceSquare =
    this.winningOrAtRiskSquare(offensiveChoiceRow, unusedSpots);

    if (offensiveChoiceSquare) {
      return offensiveChoiceSquare;
    } else {
      let defensiveChoiceRow = this.winningOrAtRiskRow(this.human);
      let defensiveChoiceSquare =
      this.winningOrAtRiskSquare(defensiveChoiceRow, unusedSpots);
      return defensiveChoiceSquare;
    }

  }

  winningOrAtRiskRow(player) {
    let remainingWinningRows = TTTGame.POSSIBLE_WINNING_ROWS.filter(row => {
      return !row.every(element => this.board.usedSquares().includes(element));
    });

    let rowChoice = remainingWinningRows.find(row => {
      return this.board.countMarkersFor(player, row) === 2;
    });

    return rowChoice;
  }

  winningOrAtRiskSquare(row, unusedSpots) {
    let squareChoice = null;
    if (row) {
      squareChoice = row.find(square => unusedSpots.includes(square));
    }
    return squareChoice;
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  updateScore(winner) {
    if (winner === this.human) {
      this.human.increaseScore();
    } else if (winner === this.computer) {
      this.computer.increaseScore();
    }
  }

  determineWinner() {
    if (this.isWinner(this.human)) {
      return this.human;
    } else if (this.isWinner (this.computer)) {
      return this.computer;
    } else {
      return null;
    }
  }

  displayGameResults(winner) {
    if (winner === this.human) {
      console.log("You won! Congratulations!");
    } else if (winner === this.computer) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  boardIsFull() {
    let unusedSquares = this.board.unusedSquares();
    return unusedSquares.length === 0;
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }
  static joinOr(choices, delimiter = ', ', joinerWord = 'or') {
    if (choices.length === 1) {
      return String(choices[0]);
    } else if (choices.length === 2) {
      return `${choices[0]} ${joinerWord} ${choices[1]}`;
    } else {
      let lastNumber = choices[choices.length - 1];
      let result = choices.slice(0, -1).join(delimiter);
      return `${result}${delimiter}${joinerWord} ${lastNumber}`;
    }
  }

  determineMatchWinner() {
    if (this.human.score === TTTGame.MATCH_OVER) {
      return this.human;
    } else if (this.computer.score === TTTGame.MATCH_OVER) {
      return this.computer;
    } else {
      return null;
    }
  }

  displayMatchWinner(winner) {
    console.log('The match is over!');
    if (winner === this.human) {
      console.log('You are the grand winner! Hooray!');
    } else {
      console.log('The computer is the grand winner! Hooray for me!');
    }
  }
}

let game = new TTTGame();
game.play();