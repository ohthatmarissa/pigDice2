/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function () {

    //get random number 
    var dice = Math.floor(Math.random() * 6) + 1;

    //display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //update the round score if number is not 1
    if (dice !== 1) {
        //add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();

    }

})

//hold points and update interface
//when the hold button is clicked it will set off this function
document.querySelector('.btn-hold').addEventListener('click', function () {
    //add current score(roundScore) to global score 
    scores[activePlayer] += roundScore;

    //update UI(user interface)
    //whichever player is active take the score of that player and add to the global score
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

    //check if the player won the game
    if (scores[activePlayer] >= 20) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')

        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
    } else {
        //next player
        nextPlayer();
    }


})

function nextPlayer() {
    //next player
    //if active player is 0 then active player must have rolled 1 so then active player gets 0 points
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //and reset the roundscore to 0
    roundScore = 0;

    //each time a new player starts rolling, the roundscore should be 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //this denotes with HTML and CSS .active class, which player is the active roller
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    //this hides the dice after rolling a 1 and changing player
    document.querySelector('.dice').style.display = 'none';
}


//document.querySelector('#current-' + activePlayer).textContent = dice;

//var x = document.querySelector('#score-0').textContent;
//console.log(x);
