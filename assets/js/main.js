let tableRow = document.getElementsByTagName('tr');
let tableCell = document.getElementsByTagName('td');
let tableSlot = document.querySelectorAll('.slot');
const playerTurn = document.querySelector('.player-turn');
const reset = document.querySelector('.reset');

for (let i = 0; i < tableCell.length; i++) {
    tableCell[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`);
    })
}


while (!player1) {
    var player1 = prompt('Nom du Joueur 1 qui sera le rouge :');
}

player1Color = 'red';

while (!player2) {
    var player2 = prompt('Nom du Joueur 2 qui sera le jaune :');
}

player2Color = 'yellow';

let currentPlayer = 1;
playerTurn.textContent = `C'est le tour de : ${player1}!`;


Array.prototype.forEach.call(tableCell, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
});

function changeColor(e) {
    let column = e.target.cellIndex;
    let row = [];

    for (let i = 5; i > -1; i--) {
        if (tableRow[i].children[column].style.backgroundColor == 'white') {
            row.push(tableRow[i].children[column]);
            if (currentPlayer === 1) {
                row[0].style.backgroundColor = player1Color;
                if (horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
                    playerTurn.textContent = `${player1} c'est le gagnant!!`;
                    playerTurn.style.color = player1Color;
                    return (alert(`Ganó ${player1}!!`));
                } else if (drawCheck()) {
                    playerTurn.textContent = `C'est un match!!`;
                    return (alert(`C'est un match!!`));
                } else {
                    playerTurn.textContent = `C'est le tour de : ${player2}!`;
                    return currentPlayer = 2;
                }
            } else {
                row[0].style.backgroundColor = player2Color;
                if (horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
                    playerTurn.textContent = `${player2} c'est le gagnant!!`;
                    playerTurn.style.color = player2Color;
                    return (alert(`${player2} c'est le gagnant!!`));
                } else if (drawCheck()) {
                    playerTurn.textContent = `C'est un match!!`;
                    return (alert(`C'est un match!!`));
                } else {
                    playerTurn.textContent = `C'est le tour de : ${player1}!`;
                    return currentPlayer = 1;
                }
            }
        }
    }
}


function colorMatchCheck(one, two, three, four) {
    return (one == two && one === three && one === four && one !== 'white')
}

function horizontalCheck() {
    for (let r = 0; r < tableRow.length; r++) {
        for (let c = 0; c < 4; c++) {
            if (colorMatchCheck(tableRow[r].children[c].style.backgroundColor, tableRow[r].children[c + 1].style.backgroundColor,
                tableRow[r].children[c + 2].style.backgroundColor, tableRow[r].children[c + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
};

function verticalCheck() {
    for (let c = 0; c < 7; c++) {
        for (let r = 0; r < 3; r++) {
            if (colorMatchCheck(tableRow[r].children[c].style.backgroundColor, tableRow[r + 1].children[c].style.backgroundColor,
                tableRow[r + 2].children[c].style.backgroundColor, tableRow[r + 3].children[c].style.backgroundColor)) {
                return true;
            }
        }
    }
}

function diagonalCheck1() {
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row + 1].children[col + 1].style.backgroundColor,
                tableRow[row + 2].children[col + 2].style.backgroundColor, tableRow[row + 3].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
}

function diagonalCheck2() {
    for (let col = 0; col < 4; col++) {
        for (let row = 5; row > 2; row--) {
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row - 1].children[col + 1].style.backgroundColor,
                tableRow[row - 2].children[col + 2].style.backgroundColor, tableRow[row - 3].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
}

function drawCheck() {
    let fullSlot = [];
    for (let i = 0; i < tableCell.length; i++) {
        if (tableCell[i].style.backgroundColor !== 'white') {
            fullSlot.push(tableCell[i]);
        }
        if (fullSlot.length === tableCell.length) {
            return true;
        }
    }
}

reset.addEventListener('click', () => {
    tableSlot.forEach(slot => {
        slot.style.backgroundColor = 'white';

    });
    playerTurn.style.Color = 'black';
    return (currentPlayer === 1 ? playerTurn.textContent = `C'est le tour de : ${player1}!` : playerTurn.textContent = `C'est le tour de : ${player2}!`)
})