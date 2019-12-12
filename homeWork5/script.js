/*let - var
const - constant



if(true){
    var a = 'Hello World!';
}

console.log(a);




Scope

console.log(b);

let b = 15;

Hoisting


Array and Object (const)



Spread*/

/*
const arr1 = [1, 2, 4, 6];
const arr2 = [24, 1, 42, 72];

const arr12 = Array.prototype.push.apply(arr1, arr2);


console.log([...arr1, ...arr2]);



const obj1 = {
    n1: 'Hello',
    n2: 'World'
};

const obj2 = {
    n1: 'By'
};

var obj12 = Object.assign(obj2, obj1);

let objEs6 = {
    ...obj1,
    ...obj2
};

console.log(obj12);
 console.log(objEs6);



const arrNext = [4, 12, 2];

function sum(a,b,c){
    return (a+b)/c;
}

 console.log(sum(arrNext[0], arrNext[1], arrNext[2]));
  console.log(sum.apply(null, arrNext));
  console.log(sum(...arrNext));



 // REST

 function output(val1, val2, ...REST){
    console.log(val1, val2,  REST);
 }

output(15, 12, 12, 1, -1, 2.5, 24, 'sdfsfd');
*/


const calculator = {
  displayValue: '0',
  firstOperand: null,
  secondOperand: null,
  waitingForSecondOperand: false,
  operator: null
};
let list = [];

//All Operators
  const allCalculation = {

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '%': (firstOperand, secondOperand) => firstOperand % secondOperand,

  '!n': function factorial(firstOperand) {
        return firstOperand ? firstOperand * factorial(firstOperand - 1) : 1
  },

  '2n': (firstOperand, secondOperand) => Math.pow(firstOperand,secondOperand),

  'sin': (firstOperand, secondOperand) => Math.sin(secondOperand * Math.PI/180),

  'cos': (firstOperand) => Math.cos(firstOperand),

  'tg': (firstOperand) => Math.tan(firstOperand * Math.PI/180),

  'ctg': (firstOperand) => 1 / Math.tan(firstOperand * Math.PI/180),

  '=': (firstOperand, secondOperand) => secondOperand,
};

  // перевод из радиан в градусы
// function getTanDeg(deg) {
//     var rad = deg * Math.PI/180;
//     return Math.tan(rad);
// }
//
// (deg) => Math.tan(deg * Math.PI/180);



function inputOperand(ourOperand) {
  const {
      displayValue,
      waitingForSecondOperand,
      operator
  } = calculator;

  if (waitingForSecondOperand === true) {
      calculator.displayValue = ourOperand;
      calculator.waitingForSecondOperand = false;
  } else {
      calculator.displayValue = displayValue === '0' ? ourOperand : displayValue + ourOperand;
  }

  console.log(calculator);
}


function handleOperator(nextOperator) {
  const {
      firstOperand,
      secondOperand,
      displayValue,
      operator
  } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
      calculator.operator = nextOperator;
      console.log(calculator);
      return;
  }

  if (firstOperand == null) {
      calculator.firstOperand = inputValue;
      // inputValue = calculator.firstOperand; // вопрос
  } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = allCalculation[operator](currentValue, inputValue);

      calculator.displayValue = String(result);
      calculator.firstOperand = result;


      const b = `${currentValue} ${operator} ${inputValue} = ${result}`;
      list.push(b);
      console.log(list);
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);

}


function updateDisplay() {
  const display = document.querySelector('.calc_all');
    const {
        displayValue,
        waitingForSecondOperand,
        operator,
        firstOperand
    } = calculator;

  display.value = calculator.displayValue;

    if (operator === '/' && displayValue === '0' && waitingForSecondOperand === false) {
        alert('Делить на ноль нельзя');
    }
    if (displayValue === '.2' && firstOperand === 0.1 && operator === '+' ||
        displayValue === '.1' && firstOperand === 0.2 && operator === '+' ) {
        calculator.displayValue = '0.3' - firstOperand;
    }
}
// num.toFixed(1);


updateDisplay();




const keys = document.querySelector('.calculator-buttons');
const innerHist = document.getElementById('innerHist');
const innerHistUl = document.getElementById('ul');
keys.addEventListener('click', (event) => {
    let i;
  const {target} = event;
    // const {
    //     displayValue,
    //     waitingForSecondOperand,
    //     operator,
    //     firstOperand
    // } = calculator;
    // console.log(displayValue);

  if (!target.matches('button')) {
      return;
  }

  if (target.classList.contains('operator')) {
      handleOperator(target.value);
      updateDisplay();
      return;
  }

  if (target.classList.contains('clear') === true) {
      location.reload()
  }

  if (target.classList.contains('history') === true) {
      for (i = 0; i < list.length ; i++ ){
          if (i % 2 === 0){
              innerHist.innerText = `История: `;
              innerHistUl.innerHTML += `<li>${list[i]}</li>`;
              console.log(list[i]);
          }
      }
  }

  inputOperand(target.value);
  updateDisplay();
});


class Calc {
    constructor (firstOperand, secondOperand, operator){
        this.firstOperand = firstOperand;
        this.secondOperand = secondOperand;
        this.operator = operator;
    }
    getHist() {
        return `${this.firstOperand} ${this.operator} ${this.secondOperand} =`
    }
}
let user = new Calc(5,5,'+');
console.log(user.getHist());