import { keysOrder } from './keysOrder.js';
import { winningWord } from './index.js';
import { updateGrid } from './grid.js';

let keyboard = document.getElementById('keyboard');

let keyboardState = {};

export const drawKeyboard = () => {
    keysOrder.forEach(row => {
        let keyboardRow = document.createElement('div');
        keyboardRow.classList.add('row');
        row.forEach(key => {
            let keyboardKey = document.createElement('div');
            keyboardKey.classList.add('letter-key');
            keyboardKey.id = `key-${key}`;
            keyboardKey.textContent = key;
            keyboardKey.addEventListener('click', e => updateGrid(e));
            if (!key) {
                keyboardKey.classList.add('half-key');
            }
            if (key === 'del' || key === 'enter')
                keyboardKey.classList.add('functional-key');
            keyboardRow.appendChild(keyboardKey);
        });
        keyboard.append(keyboardRow);
    });
};

export const updateKeyboard = row => {
    let winningLetters = Array.from(winningWord);
    let currentLetters = Array.from(row.children).map(tile => tile.textContent);
    currentLetters.forEach((letter, i) => {
        if (!keyboardState[letter]) {
            keyboardState[letter] = 'absent';
        }
        if (
            keyboardState[letter] === 'absent' &&
            winningLetters.includes(letter)
        ) {
            keyboardState[letter] = 'present';
        }
        if (
            keyboardState[letter] === 'present' &&
            letter === winningLetters[i]
        ) {
            keyboardState[letter] = 'correct';
        }
    });
    Object.entries(keyboardState).forEach(entry => {
        const [key, dataLetter] = entry;
        document
            .getElementById(`key-${key}`)
            .setAttribute('data-letter', dataLetter);
    });
};
