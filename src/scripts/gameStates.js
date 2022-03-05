export const win = currentAttemptNumber => {
    alert(
        `You won on attempt number ${
            currentAttemptNumber + 1
        }\nRefresh to play again`
    );
};

export const lose = () => {
    alert('You lost!!\nRefresh to play again');
};

export const notEnoughLetters = () => {
    alert('not enough letters!');
};

export const notInWordList = () => {
    alert('not in word list!');
};
