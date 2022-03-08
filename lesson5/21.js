let shuffle = require('shuffle-array');
let readline = require('readline-sync');

class Deck {
  static CARD_SUITS = ['H', 'D', 'S', 'C'];
  static CARD_RANK = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  static FACE_CARDS = ['J', 'Q', 'K'];


  constructor() {
    this.reset();
  }

  create() {
    this.deck = [];
    Deck.CARD_SUITS.forEach(suit => {
      Deck.CARD_RANK.forEach(rank => {
        this.deck.push(suit + rank);
      });
    });
  }

  deal(numberOfCardsToDeal = 1) {
    if (this.deck < numberOfCardsToDeal) {
      this.reset();
    }
    let cards = shuffle.pick(this.deck, {picks : numberOfCardsToDeal});
    this.removeCard(cards[0]);
    if (numberOfCardsToDeal === 2) {
      this.removeCard(cards[1]);
    }
    return cards;
  }

  removeCard(card) {
    let index = this.deck.indexOf(card);
    this.deck.splice(index, 1);
  }

  getSize() {
    return this.deck.length;
  }

  reset() {
    this.create();
    shuffle(this.deck);
  }

}

class Participant {
  constructor() {
    this.hand = [];
  }

  isBusted() {
    if (this.cardCount() > 21) {
      return true;
    }

    return false;
  }

  cardCount() {
    let cardValues = this.getCardValues();
    if (cardValues.includes('A')) {

      let valuesWithoutAces = cardValues.filter(value => value !== 'A');
      let numberOfAces = cardValues.length - valuesWithoutAces.length;

      let sum = valuesWithoutAces.reduce((prev, current) => prev + current);
      for (let index = 0; index < numberOfAces; index += 1) {
        if (sum + 11 < 21) {
          sum += 11;
        } else {
          sum += 1;
        }
      }
      return sum;
    }
    return cardValues.reduce((a,b) => a + b);
  }

  getCardValues() {
    let strValues = this.hand.map(card => card.slice(1));
    let numValues = strValues.map(value => {
      if (Deck.FACE_CARDS.includes(value)) {
        return 10;
      } else if (value === 'A') {
        return 'A';
      } else {
        return Number(value);
      }
    });

    return numValues;
  }

  setHand(card) {
    if (Array.isArray(card)) {
      card.forEach(element => this.hand.push(element));
    } else {
      this.hand.push(card);
    }
  }

  getHand() {
    return this.hand;
  }

  resetHand() {
    this.hand = [];
  }
}

class Player extends Participant {
  static STARTING_POINTS = 5;

  constructor() {
    super();
    this.points = Player.STARTING_POINTS;
  }

  getScore() {
    return this.points;
  }

  increaseScore() {
    this.points += 1;
  }

  decreaseScore() {
    this.points -= 1;
  }
}

class Dealer extends Participant {
  constructor() {
    super();
    this.hiddenCard = null;
  }

  hideCard() {
    this.hiddenCard = this.hand.pop();
    this.hand.push('??');
  }

  revealCard() {
    this.hand.pop();
    this.hand.push(this.hiddenCard);
  }

  getHand() {
    return this.hand;
  }

}

class TwentyOneGame {
  static CARDS_STARTING_HAND = 2;
  static DEALER_STOP = 17;
  static MAX_POINTS = 10;

  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }
  start() {
    this.displayWelcomeMessage();
    while (true) {
      this.playHand();

      if (this.player.getScore() === 0) {
        console.log('You ran out of money! Game over.');
        break;
      } else if (this.player.getScore() === TwentyOneGame.MAX_POINTS) {
        console.log('You won $10! You\'re the ultimate winner!');
        break;
      }
      this.resetHands();
      //this.clearPlayingArea();
      this.displayGameResult();
    }
    this.displayGoodbyeMessage();
  }

  playHand() {
    this.dealStartingHands();
    this.showCards('player');
    this.showCards('dealer');
    this.playerTurn();
    if (!this.player.isBusted()) {
      this.dealerTurn();
    }
    this.displayHandResult();

  }

  resetHands() {
    this.player.resetHand();
    this.dealer.resetHand();
  }

  clearPlayingArea() {
    console.clear();
  }

  dealStartingHands() {
    this.player.setHand(this.deck.deal(TwentyOneGame.CARDS_STARTING_HAND));
    this.dealer.setHand(this.deck.deal(TwentyOneGame.CARDS_STARTING_HAND));
  }

  hit(user) {
    let card = this.deck.deal();
    user.setHand(card);
  }

  showCards(user, type = 'hide') {

    if (user === 'player') {
      let playerHand = this.player.getHand();
      console.log(`Player's Hand:\n ${playerHand.join(', ')}`);
    } else {
      let dealerHand;
      if (type === 'hide') {
        this.dealer.hideCard();
        dealerHand = this.dealer.getHand();
        console.log(`Dealer's Hand:\n ${dealerHand.join(', ')}`);
        this.dealer.revealCard();
      } else {
        dealerHand = this.dealer.getHand();
        console.log(`Dealer's Hand:\n ${dealerHand.join(', ')}`);
      }
    }
  }

  playerTurn() {
    let action = this.playerAction();

    while (true) {
      if (action.toLowerCase()[0] === 'h') {
        this.hit(this.player);
        this.showCards('player');
      } else if (action.toLowerCase()[0] === 's') {
        console.log(`Okay! On to the dealer!`);
        break;
      }

      if (this.player.isBusted()) break;

      action = this.playerAction();
    }


  }

  playerAction() {
    const prompt = ('\nDo you want to (h)it or (s)tay? ');
    const VALID_ANSWERS = ['h', 's'];
    let action = readline.question(prompt);

    while (true) {
      if (VALID_ANSWERS.includes(action.toLowerCase()[0])) {
        if (action.toLowerCase()[0] === 'h') {
          console.log(`You chose to hit!\n`);
        } else {
          console.log(`You chose to stay!\n`);
        }

        break;
      }
      console.log('Sorry, that\'s not a valid answer.');
      action = readline.question(prompt);
    }
    return action;
  }

  dealerContinue() {
    readline.question("Press Return to continue...");
  }

  dealerTurn() {
    this.showCards('dealer', 'reveal');

    while (true) {
      if (this.dealer.cardCount() >= TwentyOneGame.DEALER_STOP) {
        this.dealerAction('stay');
        break;
      }
      if (this.dealer.cardCount() < TwentyOneGame.DEALER_STOP) {
        this.hit(this.dealer);
        this.dealerAction('hit');
      }

      if (this.dealer.isBusted()) break;
      this.dealerContinue();


    }

  }

  dealerAction(action) {
    if (action === 'hit') {
      console.log('Dealer hits!\n');
      this.showCards('dealer', 'reveal');
    } else if (action === 'stay') {
      console.log('Dealer stays.\n');
      this.showCards('dealer', 'reveal');
    }
  }

  displayWelcomeMessage() {
    console.log("Hello! Welcome to the game of Twenty-One!\n");
    console.log('You can play for as long as you have money (^_^)');
    console.log(`You currently have $${this.player.getScore()}`);
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Twenty-One. Goodbye!");
  }

  displayGameResult() {
    console.log(`You currently have $${this.player.getScore()}.\n`);
  }

  displayHandResult() {

    if (this.player.isBusted()) {
      console.log('You went bust!\n');
    } else if (this.dealer.isBusted()) {
      console.log('Dealer went bust!\n');
    } else {
      let winner = this.isWinner();
      if (winner === 'Tie') {
        console.log ('\nGame was a tie! No winner here.\n');
      } else {
        console.log(`\n${winner} is the winner!\n`);
      }
    }

    console.log('Final hands: ');
    this.showCards('player');
    this.showCards('dealer', 'reveal');
    console.log('\nFinal standings: \n');
    console.log(`Your score: ${this.player.cardCount()}`);
    console.log(`Dealer's score: ${this.dealer.cardCount()}`);

  }

  isWinner() {
    let playerScore = this.player.cardCount();
    let dealerScore = this.dealer.cardCount();
    if (playerScore > dealerScore) {
      this.player.increaseScore();
      return 'Player';
    } else if (dealerScore > playerScore) {
      this.player.decreaseScore();
      return 'Dealer';
    } else {
      return 'Tie';
    }
  }

}

let game = new TwentyOneGame();
game.start();