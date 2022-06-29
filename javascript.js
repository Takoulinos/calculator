//operations plus operate function

function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    if ((a*b)%1 != 0) {return (a*b).toFixed(5);}
    else {return a*b;}
}

function divide(a,b) {
    if (b === 0) {return 'Don\'t divide by zero you idiot';}
    if (a%b != 0) {return (a/b).toFixed(5);}
    else {return a/b;}
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(parseFloat(a),parseFloat(b)).toString();
        case "-":
            return subtract(parseFloat(a),parseFloat(b)).toString();
        case '*':
            return multiply(parseFloat(a),parseFloat(b)).toString();
        case '/':
            return divide(parseFloat(a),parseFloat(b)).toString();
    }
}

// update display with a number press
function displayNumbers(num) {
    display.textContent = displayValue + num;
    displayValue = display.textContent;
    result = '';
}

// update display with a result
function displayResult(num) {
    display.textContent = num;
    displayValue = '';
    currentOperator = '';
}

//global variables
const display = document.querySelector('#display');
let displayValue = '';
let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let result = '';

//numbers event listener
const numbers = document.querySelectorAll('.number');
numbers.forEach(number => number.addEventListener('click', function() {displayNumbers(this.textContent);}));

//operators
const operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', function() {
    if (currentOperator) {
        if (displayValue) {secondNumber = displayValue;}
        else {secondNumber = firstNumber;}
        result = operate(currentOperator, firstNumber, secondNumber);
        displayResult(result);
    }
    currentOperator = this.textContent;
    (!result) ? firstNumber = displayValue : firstNumber = result;
    displayValue = '';
}));


// = function
const equals = document.querySelector('.equals');
equals.addEventListener('click', function() {
    if (!firstNumber) {
        displayResult(displayValue);
    }
    else {
        if (displayValue) {secondNumber = displayValue;}
        result = operate(currentOperator, firstNumber, secondNumber);
        displayResult(result);
    }
});

//clear function
const clear = document.querySelector('.clear');
clear.addEventListener('click', function() {
    displayValue = '';
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    result = '';
    const display = document.querySelector('#display');
    display.textContent = '0';
});

//comma function
const comma = document.querySelector('.comma');
comma.addEventListener('click', function() {
    if (displayValue.includes('.')) {
        return;
    }
    else {
        (displayValue) ? displayNumbers('.') : displayNumbers('0.');
    }
});

//backspace function
const backspace = document.querySelector('.backspace');
backspace.addEventListener('click', function () {
    if (displayValue) {
        displayValue = displayValue.slice(0, (displayValue.length - 1));
    }
    if (displayValue) {
        display.textContent = displayValue;
    }
    else {
        display.textContent = '0';
    }
})

//keyboard support
document.addEventListener('keydown', function(e) {
    const keyboardInput = document.querySelector(`button[data-key = '${e.key}']`);
    if (keyboardInput) {keyboardInput.click();}
});