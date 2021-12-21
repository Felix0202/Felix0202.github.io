let score1 = 0;
let score2 = 0;
let passes = 1; // int this stage of the code not more than 1!
let randomNumber1 = 0;
let randomNumber2 = 0;
let player1_results = new Array(passes);
let player2_results = new Array(passes);
let player1_available = true;
let player2_available = true;

let output1 = document.getElementById('output1');
let output2 = document.getElementById('output2');
let output = document.getElementById('output');
let namePlayer1 = 'Spieler 1';
let namePlayer2 = 'Spieler 2';
let colorPlayer1 = "#ffffff";
let colorPlayer2 = "#ffffff";

let animation1_ON = false;
let animation2_ON = false;


function changeNamePlayer1() {
    let temp = document.getElementById('input_Player1');
    namePlayer1 = temp.value;
    document.getElementById('input_Player1').value = ``;
    document.getElementById('input_Player1').placeholder = `${namePlayer1}`;
    output1.innerHTML = '<p>' + namePlayer1 + ':</p>';
    output.innerHTML = '';
    checkWinner();
}

function changeNamePlayer2() {
    let temp = document.getElementById('input_Player2');
    namePlayer2 = temp.value;
    document.getElementById('input_Player2').value = ``;
    document.getElementById('input_Player2').placeholder = `${namePlayer2}`;
    output2.innerHTML = '<p>' + namePlayer2 + ':</p>';
    output.innerHTML = '';
    checkWinner();
}

function changeColorPlayer1() {
    let temp = document.getElementById('color_Player1');
    colorPlayer1 = temp.value;
}

function changeColorPlayer2() {
    let temp = document.getElementById('color_Player2');
    colorPlayer2 = temp.value;
}

function newDice() {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    return randomNumber;
}

function checkWinner() {
    if (!player1_available && !player2_available || player1_available && player2_available){
        output.innerHTML = '';
        for (let i = 0; i < passes; i++) {
            if (player1_results[i] > player2_results[i]) {
                score1++;
            } else if (player2_results[i] > player1_results[i]) {
                score2++;
            }
        }

        if (score1 > score2) {
            output.innerHTML += '<p id="winner">' + namePlayer1 + ' - Score: ' + score1 + '</p>';
            output.innerHTML += '<p id="loser">' + namePlayer2 + ' - Score: ' + score2 + '</p>';
            output.innerHTML += '<p id="winner">Spieler1 hat gewonnen!</p> <hr>';
        } else if (score1 < score2) {
            output.innerHTML += '<p id="loser">' + namePlayer1 + ' - Score: ' + score1 + '</p>';
            output.innerHTML += '<p id="winner">' + namePlayer2 + ' - Score: ' + score2 + '</p>';
            output.innerHTML += '<p id="winner">Spieler2 hat gewonnen!</p> <hr>';
        } else {
            output.innerHTML += '<p>' + namePlayer1 + ' - Score: ' + score1 + '</p>';
            output.innerHTML += '<p>' + namePlayer2 + ' - Score: ' + score2 + '</p>';
            output.innerHTML += '<p>Unentschieden</p> <hr>';
        }
    }

}

function diceAnimation_Plyer1() {
    let temp = newDice();
    animation1_ON = true;
    document.getElementById('button_new').style.opacity = '0.2';
    output1.innerHTML = `<p>${namePlayer1}:</p> <p> <img style="background-color: ${colorPlayer1}; padding: 5px; padding-top: 0px; background-clip: content-box" src="./img/${temp}.png" alt="Würfelzahl"> <br> </p>`;
}

function diceAnimation_Plyer2() {
    let temp = newDice();
    animation2_ON = true;
    output2.innerHTML = `<p>${namePlayer2}:</p> <p> <img style="background-color: ${colorPlayer2}; padding: 5px; padding-top: 0px; background-clip: content-box" src="./img/${temp}.png" alt="Würfelzahl"> <br> </p>`;
}

function newDicePlayer1() {
    if (player1_available) {
        output1.innerHTML = '<p>' + namePlayer1 + ':</p>';
        document.getElementById('button_1').style.opacity = '0.2';
        for (let i = 0; i < passes; i++) {
            randomNumber1 = newDice();
            player1_results[i] = randomNumber1;
            for (let j = 1; j <= 10; j++) {
                if (j != 10) {
                    setTimeout(diceAnimation_Plyer1, (500 * j));
                } else {
                    setTimeout(function (){output1.innerHTML = `<p>${namePlayer1}:</p> <p> <img style="background-color: ${colorPlayer1}; padding: 5px; padding-top: 0px; background-clip: content-box" src="./img/${randomNumber1}.png" alt="Würfelzahl"> <br> </p>`;
                        animation1_ON = false;
                        if (!animation1_ON && !animation2_ON){
                            document.getElementById('button_new').style.opacity = '1';
                        }
                    }, 5000);
                }
            }
        }
        setTimeout(checkWinner, 5000);
        player1_available = false;
    }
}

function newDicePlayer2() {
    if (player2_available) {
        output2.innerHTML = '<p>' + namePlayer2 + ':</p>';
        document.getElementById('button_2').style.opacity = '0.2';
        for (let i = 0; i < passes; i++) {
            randomNumber2 = newDice();
            player2_results[i] = randomNumber2;
            output2.innerHTML += `<p> <img style="background-color: ${colorPlayer2}; padding: 1px; padding-top: 0px;background-clip: content-box" src="./img/${randomNumber2}.png" alt="Würfelzahl"> <br> </p>`;
            for (let j = 1; j <= 10; j++) {
                if (j != 10) {
                    setTimeout(diceAnimation_Plyer2, (500 * j));
                } else {
                    setTimeout(function (){output2.innerHTML = `<p>${namePlayer2}:</p> <p> <img style="background-color: ${colorPlayer2}; padding: 5px; padding-top: 0px; background-clip: content-box" src="./img/${randomNumber2}.png" alt="Würfelzahl"> <br> </p>`;
                        animation2_ON = false;
                        if (!animation1_ON && !animation2_ON){
                            document.getElementById('button_new').style.opacity = '1';
                        }
                        }, 5000);
                }
            }
        }
        setTimeout(checkWinner, 5000);
        player2_available = false;
    }
}

function startGame() {
    if (!animation1_ON && !animation2_ON){
        output1.innerHTML = '<p>' + namePlayer1 + ':</p>';
        output2.innerHTML = '<p>' + namePlayer2 + ':</p>';
        document.getElementById('button_1').style.opacity = '1';
        document.getElementById('button_2').style.opacity = '1';
        player1_results = new Array(passes);
        player2_results = new Array(passes);
        player1_available = true;
        player2_available = true;
    }

}

output1.innerHTML = '<p>Spieler 1: </p>';
output2.innerHTML = '<p>Spieler 2: </p>';
checkWinner();