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
	displayElement.textContent = displayContent;
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

	firstNum = operate(+firstNum, +secondNum, operator);
	secondNum = '';
	operator = null;
	
	updateDisplay(firstNum);
}

function setOperator(event) {
	const operation = event.target.dataset.operation;
	if (operator !== null && secondNum !== '') {
		calculate()
	}
	operator = operation;
	updateDisplay(firstNum);
}

function addNumber(event) {
	const num = event.target.textContent;

	if (operator === null || firstNum == '') {
		firstNum += num;
		updateDisplay(firstNum);
		return;
	}
	
	secondNum += num;
	updateDisplay(secondNum);
}

const operationButtons = document.querySelectorAll('.operation');
operationButtons.forEach(btn => btn.addEventListener('click', setOperator));
document.querySelector('#clear').addEventListener('click', clear);
document.querySelector('#calculate').addEventListener('click', calculate);
const numberButtons = document.querySelectorAll('.number');

numberButtons.forEach(button => button.addEventListener('click', addNumber));