//Auxiliary states to determine which part of the operation we're in
const READY = 0;
const NUM1 = 1;
const OP = 2;
const NUM2 = 3;


// The four main operations
function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    if (n2 === 0) {
        return "LOL, NO";
    }
    return n1 / n2;
}

// This takes an operator and two numbers and applies the appropriate
// operation to the two numbers
function operate(op, n1, n2) {
    switch (op) {
        case "+":
            return add(n1, n2);

        case "-":
            return subtract(n1, n2);

        case "*":
            return multiply(n1, n2);

        case "/":
            return divide(n1, n2);
    
        default:
            break;
    }
}

// Sets new content for a display
function updateDisplay(display, newText) {
    display.innerText = newText
}

// These keep track of the current operator and operands
let operand1 = null;
let operand2 = null;
let operator = null;

// This keeps track of the state of the operation
let state = READY

// These are the displays that show what the calculator is doing
// The main display shows the number that the user is inputting and the result
// when the equals button is clicked
const mainDisplay = document.querySelector("div.display-result");
const operand1Display = document.querySelector("#display-number-1");
const operatorDisplay = document.querySelector("#display-operator");
const operand2Display = document.querySelector("#display-number-2");

// These are all the buttons from the calculator
const clearButton = document.querySelector("button.button-clear");
const numberButtons = document.querySelectorAll("button.button-number");
const operatorButtons = document.querySelectorAll("button.button-operator");
const equalsButton = document.querySelector("button.button-equals");



// Clears the displays and the state of the operation
function clear() {
    operand1 = null;
    operand2 = null;
    operator = null;
    state = READY;
    updateDisplay(mainDisplay, "");
    updateDisplay(operand1Display, "");
    updateDisplay(operatorDisplay, "");
    updateDisplay(operand2Display, "");
}

clearButton.addEventListener('click', clear);

// Inputs a number into the main display
function inputNumber(number) {
    currentNumber = mainDisplay.innerText;
    let newNumber = currentNumber + number;
    updateDisplay(mainDisplay, newNumber);
    if (state === READY) {
        operand1 = Number(newNumber);
    } else {
        operand2 = Number(newNumber);
    }
    
}

numberButtons.forEach((nb) => {
    nb.addEventListener('click', function (e) {
        inputNumber(e.target.innerText);
    })
});

function inputOperator(op) {

    if (operand2 != null) {
        let result = operate(operator, operand1, operand2);
        operand1 = result;
        operand2 = null
        updateDisplay(operand1Display, result);      
    } else {
        updateDisplay(operand1Display, mainDisplay.innerText);
    }
    
    
    updateDisplay(operatorDisplay, op);
    updateDisplay(operand2Display, "");
    updateDisplay(mainDisplay, "");
    operator = op;
    state = NUM2;
}

operatorButtons.forEach((ob) => {
    ob.addEventListener('click', function (e) {
        inputOperator(e.target.innerText);
    })
});


function equals() {
    let result;
    if (operand1 == null) {
        result = 0;
    } else if (operand2 == null) {

        result = operand1;
    } else {
        result = operate(operator, operand1, operand2);
        updateDisplay(operand2Display, mainDisplay.innerText);
    }
    updateDisplay(mainDisplay, result);
    operand1 = result;
    operand2 = null;
    state = READY;
}

equalsButton.addEventListener('click', equals);



