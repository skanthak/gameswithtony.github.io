const MISSION_A = 'A';
const MISSION_B = 'B';
const MISSION_C = 'C';
const ORBITAL = 0;
const PLANET = 1;
const LOCALSTORAGENAME = 'onmarsgamestate';

function createCard(action, travel, mission) {
    return {
        action: action,
        travel: travel,
        mission: mission
    };
}

const soloDeck = [
    createCard(1, true, MISSION_A),
    createCard(1, true, MISSION_B),
    createCard(1, true, MISSION_B),
    createCard(1, true, MISSION_C),
    createCard(1, false, MISSION_C),
    createCard(2, true, MISSION_A),
    createCard(2, false, MISSION_A),
    createCard(2, true, MISSION_B),
    createCard(2, true, MISSION_C),
    createCard(3, true, MISSION_A),
    createCard(3, false, MISSION_B),
    createCard(3, true, MISSION_C)
];

var app = new Vue({
    el: '#onmars',
    data: {
      currentDeck: soloDeck,
      currentCard: soloDeck[0],
      showMission: false,
      currentSide: ORBITAL
    },
    mounted: function() {
        if (localStorage.getItem(LOCALSTORAGENAME)) {
            let gameState = JSON.parse(localStorage.getItem(LOCALSTORAGENAME));
            this.currentDeck = gameState.currentDeck;
            this.currentCard = gameState.currentCard;
            this.showMission = gameState.showMission;
            this.currentSide = gameState.currentSide;
        }
        else {
            this.reset();
        }
    },
    methods: {
      shuffle: function() {
        this.currentDeck = _.shuffle(soloDeck);
        this.saveGameState();
      },
      draw: function() {
          if (this.currentDeck.length === 0) {
              this.shuffle();
              this.showMission = true;
          }
          this.currentCard = this.currentDeck.shift();
          this.saveGameState();
      },
      reset: function() {
          this.shuffle();
          this.draw();
      },
      setSide: function(side) {
          this.currentSide = side;
          this.saveGameState();
      },
      turnOrderSpace: function() {
          if (!this.currentCard.travel) {
              return 4;
          }
          else {
              return this.currentCard.action;
          }
      },
      saveGameState: function() {
        let gameState = {};
        gameState.currentDeck = this.currentDeck;
        gameState.currentCard = this.currentCard;
        gameState.showMission = this.showMission;
        gameState.currentSide = this.currentSide;
        localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(gameState));
      }
    }
});