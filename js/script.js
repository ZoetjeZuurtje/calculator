let firstNum  = '';
let secondNum = '';
let operator  = null;
let displayElement = document.querySelector('.display');

function operate(a, b, operator) {
	switch (operator) {
		case 'plus':
			return a + b;
		case 'minus':
			return a - b;
		case 'mult':
			return a * b;
		case 'divide':
			return a / b;
		case 'exp':
			return a ** b;
		default:
			console.log('No operator given!');
			return 0;
	}
}

function updateDisplay(displayContent) {
	if (typeof displayContent == 'string') {
		displayElement.textContent = displayContent;
	} else {
		const MAX_DECIMALS = 8;
		displayElement.textContent = Math.round(displayContent * Math.pow(10, MAX_DECIMALS)) / Math.pow(10, MAX_DECIMALS);
	}

	// Highlight the selected operator button, and no others
	operationButtons.forEach(btn => btn.classList.remove('selected'));
	let selectedButton = document.querySelector(`button[data-operation='${operator}'`);
	if (!selectedButton) return;
	selectedButton.classList.add('selected');
}

function clear() {
	firstNum  = '';
	secondNum = '';
	operator  = null;
	updateDisplay('');
}

function calculate() {
	if (operator === null || secondNum === '') return;
	if (secondNum == 0 && operator == 'divide') {
		clear();
		updateDisplay('Err 418 🍵');
		return;
	}

	firstNum = operate(+firstNum, +secondNum, operator);
	secondNum = '';
	operator = null;
	
	updateDisplay(firstNum);
}

function setOperator(operation) {
	
	if (operator !== null && secondNum !== '') {
		calculate()
	}
	operator = operation;
	updateDisplay(firstNum);
}

function addNumber(string, char) {
	if (char == '.' && string.includes('.')) return string;

	if (char == 'Backspace') {
		string = string.slice(0, -1);
	} else {
		string += char;
	}

	updateDisplay(string);
	return string;
}

function addNumberHandler(char) {
	
	if (operator === null || firstNum == '') {
		firstNum = addNumber(firstNum, char);
		return;
	}
	secondNum = addNumber(secondNum, char);
}

function handleKeyDown(event) {
	event.preventDefault();
	const key = event.key;
	
	if (key.match(/[\d.]/) || key == 'Backspace') {
		addNumberHandler(key);
	} else if (key.match(/[*+-/^]/)) {
		setOperator(key);
	}
}

const operationButtons = document.querySelectorAll('.operation');
operationButtons.forEach(btn => btn.addEventListener('click', event => setOperator(event.target.dataset.operation)));
document.querySelector('#clear').addEventListener('click', clear);
document.querySelector('#calculate').addEventListener('click', calculate);
const numberButtons = document.querySelectorAll('.number');

numberButtons.forEach(button => button.addEventListener('click', event => addNumberHandler(event.target.textContent)));
document.documentElement.addEventListener('keydown', handleKeyDown);