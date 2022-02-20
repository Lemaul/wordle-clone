'use strict'
import {wordList} from "./wordList.js";

const winningWord = wordList[Math.floor(Math.random() * wordList.length)];
// console.log(winningWord);

let grid = document.getElementById('grid');
let currentAttemptNumber = 0;
let currentColumnNumber = 0;

function drawGrid() {
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < 5; j++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            row.append(tile);
        }
        grid.append(row);
    }
}

drawGrid();

let pressedLetter = (e, tile) => {
    if (tile.nextSibling) {
        if (tile.textContent) {
            tile = tile.nextSibling;
            currentColumnNumber++;
        }
        tile.textContent = e.key;
    } else {
        tile.textContent = tile.textContent || e.key;
    }
    tile.setAttribute("data-letter", "notConfirmed");
}

let pressedBackspace = (tile) => {
    if (tile.previousSibling) {
        if (!tile.textContent) {
            tile = tile.previousSibling;
            currentColumnNumber--;
        }
        tile.textContent = "";
    } else {
        tile.textContent = "";
    }
    tile.removeAttribute("data-letter")
}

const win = () => {
    alert(`You won on attempt number ${currentAttemptNumber + 1}\nRefresh to play again`);
    pressedLetter = () => {
    };
    pressedBackspace = () => {
    };
    pressedEnter = () => {
    };
}

const lose = () => {
    alert('You lost!!\nRefresh to play again');
    pressedLetter = () => {
    };
    pressedBackspace = () => {
    };
    pressedEnter = () => {
    };
}

const notEnoughLetters = () => {
    alert('not enough letters!')
}

const notInWordList = () => {
    alert('not in word list!')
}

const colorCurrentAttempt = (row) => {
}

let pressedEnter = (row) => {
    let word = "";
    Array.from(row.children).forEach(tile => word += tile.textContent);

    if (word.length < row.length) {
        notEnoughLetters();
        return;
    }
    if (wordList.indexOf(word) < 0) {
        notInWordList();
        return;
    }

    colorCurrentAttempt(row);

    if (row.nextSibling) {
        if (word !== winningWord) {
            currentAttemptNumber++;
            currentColumnNumber = 0;
        } else {
            win();
        }
    } else {
        if (word === winningWord) {
            win();
            return;
        }
        lose();
    }
}


function updateGrid(e) {
    let row = grid.children[currentAttemptNumber];
    let tile = row.children[currentColumnNumber];
    const letterCode = e.key.charCodeAt(0);
    if (letterCode >= 97 && letterCode <= 122)
        pressedLetter(e, tile);
    else if (e.key === "Backspace")
        pressedBackspace(tile);
    else if (e.key === "Enter")
        pressedEnter(row);
}

document.addEventListener('keydown', (e) => updateGrid(e))
