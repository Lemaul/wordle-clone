import { winningWord } from './index.js';
import { wordList } from './wordList.js';
import { win, lose, notEnoughLetters, notInWordList } from './gameStates.js';
import { updateKeyboard } from './keyboard.js';

let grid = document.getElementById('grid');
let currentAttemptNumber = 0;
let currentColumnNumber = 0;

export const drawGrid = () => {
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
};

let pressedLetter = (key, tile) => {
    if (tile.nextSibling) {
        if (tile.textContent) {
            tile = tile.nextSibling;
            currentColumnNumber++;
        }
        tile.textContent = key;
    } else {
        tile.textContent = tile.textContent || key;
    }
    tile.setAttribute('data-letter', 'notConfirmed');
};

let pressedBackspace = tile => {
    if (tile.previousSibling) {
        if (!tile.textContent) {
            tile = tile.previousSibling;
            currentColumnNumber--;
        }
        tile.textContent = '';
    } else {
        tile.textContent = '';
    }
    tile.removeAttribute('data-letter');
};

const colorCurrentAttempt = row => {
    let letterOccurrences = getLetterOccurences();
    let currentLetters = Array.from(row.children).map(tile => tile.textContent);
    let dataAttributes = Array(5);
    currentLetters.forEach((letter, index) => {
        if (
            letterOccurrences[letter] &&
            currentLetters[index] === winningWord[index]
        ) {
            dataAttributes[index] = 'correct';
            letterOccurrences[letter]--;
        }
    });
    currentLetters.forEach((letter, index) => {
        if (letterOccurrences[letter]) {
            letterOccurrences[letter]--;
            if (currentLetters[index] !== winningWord[index]) {
                dataAttributes[index] = 'present';
            }
        }
        if (!dataAttributes[index]) {
            dataAttributes[index] = 'absent';
        }
    });
    Array.from(row.children).forEach((tile, i) =>
        tile.setAttribute('data-letter', dataAttributes[i])
    );
};

const getLetterOccurences = () => {
    return Array.from(winningWord).reduce((prev, current) => {
        prev[current] ? prev[current]++ : (prev[current] = 1);
        return prev;
    }, {});
};

const endGame = () => {
    pressedBackspace = () => {};
    pressedLetter = () => {};
    pressedEnter = () => {};
};

let pressedEnter = row => {
    let word = '';
    Array.from(row.children).forEach(tile => (word += tile.textContent));

    if (word.length < row.children.length) {
        notEnoughLetters();
        return;
    }
    if (wordList.indexOf(word) < 0) {
        notInWordList();
        return;
    }

    colorCurrentAttempt(row);
    updateKeyboard(row);

    if (row.nextSibling) {
        if (word !== winningWord) {
            currentAttemptNumber++;
            currentColumnNumber = 0;
        } else {
            win(currentAttemptNumber);
            endGame();
        }
    } else {
        if (word === winningWord) {
            win(currentAttemptNumber);
            endGame();
            return;
        }
        lose();
        endGame();
    }
};

export const updateGrid = e => {
    let row = grid.children[currentAttemptNumber];
    let tile = row.children[currentColumnNumber];
    let letterCode = 0;
    let key = '';
    if (e.type === 'keydown') {
        letterCode = e.key.charCodeAt(0);
        key = e.key;
    } else if (e.type === 'click') {
        letterCode = e.target.textContent.charCodeAt(0);
        key = e.target.textContent;
    }
    if (key === 'Backspace' || key === 'del') pressedBackspace(tile);
    else if (key === 'Enter' || key === 'enter') pressedEnter(row);
    else if (letterCode >= 97 && letterCode <= 122) pressedLetter(key, tile);
};

document.addEventListener('keydown', e => updateGrid(e));
