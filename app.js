"use strict";
// DOM
const displayPrevious = document.querySelector('.display__previous');
const displayOperator = document.querySelector('.display__operant');
const displayCurrent = document.querySelector('.display__current');
const btnsNumbers = [...document.querySelectorAll('.calculator__btn-number')];
const btnsOperators = [...document.querySelectorAll('.calculator__btn-symbol')];
const btnCE = document.querySelector('.calculator__btn-CE');
const btnC = document.querySelector('.calculator__btn-C');
const btnDEL = document.querySelector('.calculator__btn-DEL');
const btnSUM = document.querySelector('.calculator__btn-sum');

let currentNumber = '';
let previousNumber = '';
let operator = '';
let previousOperator = '';

// Functions
const checkCharacters  = function checkPoinstsInTheString(string){
  let count = 0;

  [...string].forEach((char) => {
    if(char === '.'){
      count++;
    }

  })
  return count;
}

const getNumbers = function getNumbers(btn){
  let newNumber = btn.innerText;

  if(newNumber === '.' && checkCharacters(currentNumber) >= 1){
    return
  }
  
  currentNumber += newNumber;
  displayCurrentNumber(currentNumber);
}

const getOperator = function getOperator(btn){
  operator = btn.innerText;  
  
  if(currentNumber !== '' && previousNumber !== ''){
    let result = count(previousNumber, currentNumber, previousOperator);
    previousNumber = result;
    displayCurrentNumber(result);
    displayPreviousNumber(result);
    displayCurrentOperator(operator);
    currentNumber = '';
  } else if(currentNumber !== ''){
    previousNumber = currentNumber;
    currentNumber = '';    
    displayPreviousNumber(previousNumber);   
    displayCurrentOperator(operator); 
  } 

  displayCurrentOperator(operator); 
  previousOperator = operator; 
}


const count = function count(previousNumber, currentNumber, operator){
  let result = ''
  previousNumber = Number(previousNumber);
  currentNumber = Number(currentNumber);

  if(operator === '+'){
    result = previousNumber + currentNumber;
  }
  if(operator === '-'){
    result = previousNumber - currentNumber;
  }
  if(operator === '×'){
    result = previousNumber * currentNumber;
  }
  if(operator ==='÷'){
    if(currentNumber == 0){
      console.log(`You can't divide by 0`);
    } else{
     result = previousNumber / currentNumber;         
    }
  }
  return result;
}

// Display Functions
const displayCurrentNumber = function(number) {
  displayCurrent.innerText = number
}

const displayCurrentOperator = function(operator){
  displayOperator.innerText = operator
}

const displayPreviousNumber = function(previousNumber){
  displayPrevious.innerText = previousNumber;
}

// Calculator optional functions
const clearAll = function(){
  currentNumber = '';
  previousNumber = '';
  operator = '';
  previousOperator = '';
  displayCurrentNumber(currentNumber);
  displayCurrentOperator(operator);
  displayPreviousNumber(previousNumber);
}

const clearEntry = function(){
  currentNumber = '';
  displayCurrentNumber(currentNumber);
}

const deleteLast = function deleteLastCharacter(){
  currentNumber = String(currentNumber.slice(0, -1));
  displayCurrentNumber(currentNumber);

}

const sum = function sum(){
  let result = count(previousNumber, currentNumber, operator);
  previousNumber = result;
  previousOperator = operator;  
  currentNumber = '';
  displayCurrentNumber(result);
  displayCurrentOperator(operator);
  displayPreviousNumber(result);

}

// Calls
btnsNumbers.forEach((btn) => {
  btn.addEventListener('click', function(){
  getNumbers(btn);
  })
})

btnsOperators.forEach((btn) => [
  btn.addEventListener('click', function(){
    getOperator(btn);
  })
])

btnC.addEventListener('click', function(){
  clearAll();
})

btnCE.addEventListener('click', function() {
  clearEntry();
})

btnDEL.addEventListener('click', function(){
  deleteLast();
})

btnSUM.addEventListener('click', function(){
  sum();
})