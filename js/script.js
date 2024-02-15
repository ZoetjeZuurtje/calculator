let firstNum  = '';
let secondNum = '';
let operator  = null;
let displayElement = document.querySelector('.display');

function operate(a, b, operator) {
	switch (operator) {
		case '+':
			return a + b;
		case '-':
			return a - b;
		case '*':
			return a * b;
		case '/':
			return a / b;
		case '^':
			return a ** b;
		default:
			console.error('Error: Invalid operator!');
			return '';
	}
}

function updateDisplay(content) {
	if (typeof content != 'string') {
		const DISPLAY_SIZE = 10;
		content = content.toString();

		if (content.length > DISPLAY_SIZE) {
			content = content.slice(0, DISPLAY_SIZE);
		}
	
	}
	displayElement.textContent = content;

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
	if (secondNum == 0 && operator == '/') {
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

function handleSpecialInputs(input) {
	
	switch (input) {
		case 'Enter':
		case '=':
			calculate();
			break;
		case 'Backspace':
			addNumberHandler(input);
			break;
	
		default:
			console.error('Error: Invalid keyboard input');
			break;
	}
}

function handleKeyDown(event) {
	event.preventDefault();
	const key = event.key;
	
	if (key.match(/[0-9.]/)) {
		addNumberHandler(key);
	} else if (key.match(/[*+-/^]/)) {
		setOperator(key);
	} else if (key.match(/(Backspace|Enter|[=])/)) {
		handleSpecialInputs(key);
	}
}

const operationButtons = document.querySelectorAll('.operation');
operationButtons.forEach(btn => btn.addEventListener('click', event => setOperator(event.target.dataset.operation)));
document.querySelector('#clear').addEventListener('click', clear);
document.querySelector('#calculate').addEventListener('click', calculate);
const numberButtons = document.querySelectorAll('.number');

numberButtons.forEach(button => button.addEventListener('click', event => addNumberHandler(event.target.textContent)));
document.documentElement.addEventListener('keydown', handleKeyDown);