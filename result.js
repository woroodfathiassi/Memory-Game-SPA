import { insertGameScore } from './dbconfig.js';

if(localStorage.length !== 0){
    // Retrieve data from local storage
    const dataString = localStorage.getItem('gameHistory');
    const names = localStorage.getItem('playersName');
    
    // Parse JSON string back to object
    const historyData = JSON.parse(dataString);
    const namesData = JSON.parse(names);

    let score1 = 0;
    let score2 = 0;
    historyData.forEach(element => {
        if (element.option1 == element.option2) {
            if (element.player === 'one') {
            score1++;
            } else {
            score2++;
            }
        }
    });
    insertGameScore(namesData[0], namesData[1], score1, score2);
    if (score1 > score2) {
        document.querySelector('h2').innerHTML = `Winner is ${namesData[0]}`;
        document.querySelector('.score').innerHTML = `${score1}`;
    } else {
        document.querySelector('h2').innerHTML = `Winner is ${namesData[1]}`;
        document.querySelector('.score').innerHTML = `${score2}`;
    }
    document.querySelector('.text').innerHTML = `Number of correct cards`;

    let isPlayer1 = true;
    historyData.forEach(elemet => {
        if(isPlayer1){
            const row = createRow(namesData[0], elemet.card1, elemet.card2, elemet.option1==elemet.option2);
            document.querySelector('.gameresult').appendChild(row);
            isPlayer1 = false;
        }else{
            const row = createRow(namesData[1], elemet.card1, elemet.card2, elemet.option1==elemet.option2);
            document.querySelector('.gameresult').appendChild(row);
            isPlayer1 = true;
        }
    });
}

    function createRow(name, card1, card2, isSuccess){
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.innerHTML = name;
        const td2 = document.createElement('td');
        td2.innerHTML = `Open card ${card1} and ${card2}`;
        const td3 = document.createElement('td');
        td3.innerHTML = isSuccess;

        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        
        return tr;
    }

    window.playAgain = function() {
        location.reload();
    }