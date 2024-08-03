import { getAllGames } from './dbconfig.js';

(async () => {
    const games = await getAllGames();
    games.forEach(elemet => {
        const row = createRow(elemet['id'], elemet['player1'], elemet['player2'], elemet['score1'], elemet['score2']);
        document.querySelector('.allresulttable').appendChild(row);
    });
})();

function createRow(id, name1, name2, score1, score2){
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.innerHTML = id;
    const td1 = document.createElement('td');
    td1.innerHTML = name1;
    const td2 = document.createElement('td');
    td2.innerHTML = name2;
    const td3 = document.createElement('td');
    td3.innerHTML = score1;
    const td4 = document.createElement('td');
    td4.innerHTML = score2;

    const td5 = document.createElement('td');  
    if(score1 > score2){
        td5.innerHTML = `${name1} is Winner`;
    }else{
        td5.innerHTML = `${name2} is Winner`
    }          
    tr.append(td);
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    
    return tr;
}

window.playAgain = function() {
    location.reload();
}