'use strict';
import { wordList } from './wordList.js';
import { drawGrid } from './grid.js';
import { drawKeyboard } from './keyboard.js';

export const winningWord =
    wordList[Math.floor(Math.random() * wordList.length)];
// console.log(winningWord);

drawGrid();
drawKeyboard();
