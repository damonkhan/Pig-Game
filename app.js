/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, gamePlaying;

score = [0, 0];
roundScore = 0;
activePlayer = 0;

init();

document.querySelector('.btn-roll').addEventListener('click', rollDice);

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-hold').addEventListener('click', updateGlobalScore);


/* Methods */
function rollDice() {
    if (gamePlaying) {
        // Random number between 1 - 6
        var dice = Math.floor(Math.random() * 6) + 1;

        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').setAttribute('src', 'dice-' + dice + '.png');

        // Update the score IF roll is NOT 1
        if (dice !== 1) {
            // Add the score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            changePlayers();
        }
    }
}

function init() {
    // Reset global and current score to 0
    gamePlaying = true;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    score = [0, 0];
    resetCurrentScore();

    hideDice();

    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.getElementById('name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1);
    activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function resetCurrentScore() {
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    roundScore = 0;

}

function updateGlobalScore() {
    if (gamePlaying) {
        // Add score to global score for active player
        score[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
    }

    // Check if the player has won the game
    if (score[activePlayer] >= 10) {
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        hideDice();
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
        changePlayers();
    }
}

function changePlayers() {
    // Change player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    resetCurrentScore();

    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
}

function hideDice() {
    document.querySelector('.dice').style.display = 'none';
}
