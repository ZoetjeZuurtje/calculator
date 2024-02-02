let firstNum = '';
let secondNum = '';
let operator = '';
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

function updateDisplay() {
	displayElement.textContent = `${firstNum} ${operator} ${secondNum}`;
}

function clearDisplay() {
	displayElement.textContent = '';
}

function calculate() {
	let a = parseInt(firstNum);
	let b = parseInt(secondNum);
	let result = operate(a, b, operator);
	firstNum = result;
	secondNum = '';
	operator = '';
	updateDisplay();
}

function setOperator(event) {
	operator = event.target.dataset.operation;
	updateDisplay();
}

function addNumber(event) {
	let num = event.target.textContent;

	if (operator == '' || firstNum == '') {
		firstNum += num;
	} else {
		secondNum += num;
	}
	updateDisplay();
}

document.querySelector('#multiply').addEventListener('click', setOperator);
document.querySelector('#divide').addEventListener('click', setOperator);
document.querySelector('#add').addEventListener('click', setOperator);
document.querySelector('#subtract').addEventListener('click', setOperator);
document.querySelector('#exponent').addEventListener('click', setOperator);
document.querySelector('#clear').addEventListener('click', clearDisplay);
document.querySelector('#calculate').addEventListener('click', calculate);
const numberButtons = document.querySelectorAll('.number');

numberButtons.forEach(button => button.addEventListener('click', addNumber));