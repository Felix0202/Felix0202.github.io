let matrix = [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]];

let isGameAtEnd = false;
let currentPlayerIs1 = true;
let temp = 0;

let score1 = 0;
let score2 = 0;

let namePlayer1 = "Player 1";
let namePlayer2 = "Player 2";

let playerState = document.getElementById('playerState');
let stats = document.getElementById('stats');

function changeName1() {
    namePlayer1 = document.getElementById('namePlayer1').value;
    outputStats();
}

function changeName2() {
    namePlayer2 = document.getElementById('namePlayer2').value;
    outputStats();
}

function checkTemp() {
    if (temp == 3 || temp == 30) {
        isGameAtEnd = true;
    }
}

function checkWinner() {
    if (!isGameAtEnd) {
        for (let i = 0; i < 3 && !isGameAtEnd; i++) {
            temp = 0;
            for (let j = 0; j < 3 && !isGameAtEnd; j++) {
                temp += matrix [i][j];
            }
            checkTemp();
        }
    }
    if (!isGameAtEnd) {
        for (let j = 0; j < 3 && !isGameAtEnd; j++) {
            temp = 0;
            for (let i = 0; i < 3 && !isGameAtEnd; i++) {
                temp += matrix [i][j];
            }
            checkTemp();
        }
    }
    if (!isGameAtEnd) {
        temp = matrix [0][0] + matrix [1][1] + matrix [2][2];
        checkTemp();
    }
    if (!isGameAtEnd) {
        temp = matrix [2][0] + matrix [1][1] + matrix [0][2];
        checkTemp();
    }
}

function checkPlayerState() {
    playerState.innerHTML = "";
    checkTemp();
    if (!isGameAtEnd) {
        isGameAtEnd = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (matrix[i][j] == 0) {
                    isGameAtEnd = false;
                    break;
                }
            }
        }
    }
    if (isGameAtEnd) {
        if (temp == 3) {
            playerState.innerHTML += `<p>${namePlayer1} (X) Won</p>`;
            score1++;
        }
        if (temp == 30) {
            playerState.innerHTML += `<p>${namePlayer2} (O) Won</p>`;
            score2++;
        }
        outputStats();
    }
    if (isGameAtEnd) {
        playerState.innerHTML += '<p style="font-size: 3vh; margin-top: 2vh">Click on a button to start a new Game</p>';
    } else {
        if (!currentPlayerIs1) {
            playerState.innerHTML = `<p>${namePlayer1} (X) ist dran</p>`;
            currentPlayerIs1 = true;
        } else {
            playerState.innerHTML = `<p>${namePlayer2} (O) ist dran</p>`;
            currentPlayerIs1 = false;
        }
    }

}

function changeOutputMatrix(i, j) {
    if (currentPlayerIs1) {
        document.getElementById(`${i}${j}`).innerHTML = `<h2>X</h2>`;
    } else {
        document.getElementById(`${i}${j}`).innerHTML = `<h2>O</h2>`;
    }
}

function outputStats() {
    stats.innerHTML = `<div><h3>${namePlayer1} (X): ${score1}</h3></div>
                       <div><h3>${namePlayer2} (O): ${score2}</h3></div>`;
}

function settingItem(i, j) {
    if (isGameAtEnd) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                matrix[i][j] = 0;
                document.getElementById(`${i}${j}`).innerHTML = `<h2></h2>`;
            }
        }
        if (currentPlayerIs1) {
            currentPlayerIs1 = false;
        } else {
            currentPlayerIs1 = true;
        }
        //checkPlayerState();
        isGameAtEnd = false;
    } else {
        if (matrix[i][j] == 0) {
            if (currentPlayerIs1) {
                matrix [i] [j] = 1;
            } else {
                matrix [i] [j] = 10;
            }
            changeOutputMatrix(i, j);
            checkWinner();
            checkPlayerState();
        }
    }
}

outputStats();