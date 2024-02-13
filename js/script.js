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
		default:
			return a ** b;
	}
}

function updateDisplay(displayContent) {
	displayElement.textContent = displayContent;
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

document.querySelector('#multiply').addEventListener('click', setOperator);
document.querySelector('#divide').addEventListener('click', setOperator);
document.querySelector('#add').addEventListener('click', setOperator);
document.querySelector('#subtract').addEventListener('click', setOperator);
document.querySelector('#exponent').addEventListener('click', setOperator);
document.querySelector('#clear').addEventListener('click', clear);
document.querySelector('#calculate').addEventListener('click', calculate);
const numberButtons = document.querySelectorAll('.number');

numberButtons.forEach(button => button.addEventListener('click', addNumber));