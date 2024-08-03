const numOfCards = 18;
const redColor = 'red';
const whiteColor = 'white';
let gameHistory = [];
const playersName = [];

let value1 ; // the value of the first card
let value2 ; // the value of the second card
let tempElemetOne ; // pointer to flip the first card again if it's not same with the second one
let indexCard1 ; // storing the index of the first card
let indexCard2 ; // storing the index of the second card
let checkPlayer = false;
let checkCard = false; 
let counter = 0; // The counter to count the number of correct cards

document.addEventListener("DOMContentLoaded", function() {
    const homeDiv = document.createElement("div");
    homeDiv.id = "home";
    homeDiv.innerHTML = `
        <div class="container">
            <div class="title">
                <h1>Mind - Match</h1>
                <p>Unleash your memory power!</p>
            </div>
            <div class="players">
                <div class="names">
                    <input type="text" name="player1" id="player1" autocomplete="off" placeholder="First Player:"/>
                    <input type="text" name="player2" id="player2" autocomplete="off" placeholder="Second Player:"/>
                </div>            
                <button onclick="displayBoard();">Play</button>
                <button onclick="resetGame();">Reset Game</button>
            </div>
            <div class="game-board"></div>
            <button style="margin: 15px;" onclick="allGames();">All Results</button>
        </div>
    `;
    document.body.appendChild(homeDiv);
});

document.addEventListener('click', function(card) {
    const parentElemen = card.target.parentElement;
    if(parentElemen.classList == 'board-item'){
        if(!checkPlayer){
            if(!checkCard){
                flipCardOne(parentElemen);
            }else{
                checkPlayer = true;
                flipCardTwo(parentElemen, whiteColor, redColor, 'one');
                localStorage.setItem('play', JSON.stringify('two'));
                localStorage.setItem('checkPlayer', JSON.stringify(checkPlayer));
            }
        }else{
            if(!checkCard){
                flipCardOne(parentElemen);
            }else{
                checkPlayer = false;
                flipCardTwo(parentElemen, redColor, whiteColor, 'two');
                localStorage.setItem('play', JSON.stringify('two'));
                localStorage.setItem('checkPlayer', JSON.stringify(checkPlayer));
            }
        }

        if (counter === numOfCards) {
            const board = document.getElementsByClassName('game-board')[0]; 
            board.style.pointerEvents = 'none';
            localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
            showResult();
        }
    }
});

function showResult(){
    const resultDiv = document.createElement("div");
    resultDiv.id = "result";
    resultDiv.innerHTML = `
        <div class="container">
            <h1>Mind - Match</h1>
            <h2></h2>
            <p class="text"></p>
            <p class="score"></p>
            <div class="table-container">
                <table class="gameresult">
                    <tr>
                        <th>Player Name</th>
                        <th>Cards Number</th>
                        <th>Success</th>
                    </tr>
                </table>
            </div>
            <button style="margin: 15px;" onclick="playAgain();">Play Again</button>
        </div>
    `;
    document.body.appendChild(resultDiv);

    const script = document.createElement('script');
    script.src = 'result.js';
    script.type = 'module';
    document.body.appendChild(script);
    document.getElementById('home').style.display = 'none';
    document.getElementById('result').style.display = 'block';
}

function allGames(){
    const allResultDiv = document.createElement("div");
    allResultDiv.id = "allresult";
    allResultDiv.innerHTML = `
        <div class="container">
            <h1>Mind - Match</h1>
            <div class="table-container">
                <table class="allresulttable">
                    <tr>
                        <th>ID</th>
                        <th>Player 1</th>
                        <th>Player 2</th>
                        <th>Score 1</th>
                        <th>Score 2</th>
                        <th>Winner</th>
                    </tr>
                </table>
            </div>
            <button style="margin: 15px;" onclick="playAgain();">Play Again</button>
        </div>
    `;
    document.body.appendChild(allResultDiv);

    const script = document.createElement('script');
    script.src = 'allResult.js';
    script.type = 'module';
    document.body.appendChild(script);
    document.getElementById('home').style.display = 'none';
    document.getElementById('allresult').style.display = 'block';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayBoard(){
    const name1 = document.getElementById('player1').value;
    const name2 = document.getElementById('player2').value;
    if(name1 !== '' && name2 !== ''){
        playersName.push(name1);
        playersName.push(name2);
        localStorage.setItem('playersName', JSON.stringify(playersName));
        gameBoard();
        const items = document.getElementsByClassName('back');
        let count = 0;
        // filling the cards with numbers
        const shuffledArray = createArrayOfNumbers(numOfCards);
        Array.from(items).forEach(item => {
            item.innerHTML = shuffledArray[count];
            count++;
        });
        document.querySelector('.names input').readOnly = true;
        document.querySelector('.players button').style.display = 'none';
        document.getElementById('player1').style.borderColor = 'red';
    }else{
        alert('Please Enter Palyers names!');
    }
}

function resetGame(){
    localStorage.clear();
    location.reload();
}

function createBoardItem(){
    const item = document.createElement('div');
    item.classList.add('board-item');

    const front = document.createElement('div');
    front.classList.add('front');
    
    const back = document.createElement('div');
    back.classList.add('back');
    
    item.append(front, back);
    
    return item;
}

function createArrayOfNumbers(num){
    const numbers = [];
    for(let i=0 ; i<2 ; i++){
        for(let j=1 ; j<=num/2 ; j++){
            numbers.push(j);
        }
    }
    
    const shuffledArray = shuffleArray(numbers);
    localStorage.setItem('shuffledArray', JSON.stringify(shuffledArray));
    return shuffledArray;
}

function flipCardOne(parentElemen){
    tempElemetOne = parentElemen;
    value1 = parentElemen.children[1].innerHTML;
    indexCard1 = Array.from(document.getElementsByClassName('board-item')).indexOf(parentElemen);
    parentElemen.classList.add('flipped'); 
    checkCard = true;
}

function flipCardTwo(parentElemen, color1, color2, numOfPlayer){
    value2 = parentElemen.children[1].innerHTML;
    indexCard2 = Array.from(document.getElementsByClassName('board-item')).indexOf(parentElemen);
    parentElemen.classList.add('flipped');

    let numbersSet = new Set(JSON.parse(localStorage.getItem('numbersSet')) || []);
    numbersSet.add(indexCard2);
    numbersSet.add(indexCard2);
    
    checkCard = false;
    if(value1 == value2){
        counter+=2;
        localStorage.setItem('counter', JSON.stringify(counter));
        let numbersSet = new Set(JSON.parse(localStorage.getItem('numbersSet')) || []);
        numbersSet.add(indexCard1);
        numbersSet.add(indexCard2);
        localStorage.setItem('numbersSet', JSON.stringify([...numbersSet]));  
    }else{
        setTimeout(() => {
            parentElemen.classList.remove('flipped');
            tempElemetOne.classList.remove('flipped'); 
        }, 500);
    }
    
    document.getElementById('player1').style.borderColor = color1; 
    document.getElementById('player2').style.borderColor = color2; 
    gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
    gameHistory.push({player: numOfPlayer, option1: value1, option2: value2, card1: indexCard1, card2: indexCard2}); 
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}

function gameBoard(){
    document.querySelector('.game-board').style.display = 'grid';
    for(let i=0 ; i<numOfCards ; i++){
        const card = createBoardItem();
        document.querySelector('.game-board').appendChild(card);
    }
}

