import React, { useState } from 'react'

export const JavascriptCalculatorApp = () => {
  const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const operators = ['add', 'subtract', 'multiply', 'divide'];
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [allOperations, setAllOperations] = useState([]);
  const [isNegative, setIsNegative] = useState(false);

  const handleOperatorClick = (operator) => {
    const inputValue = parseFloat(displayValue);
    console.log(`Operator clicked: ${operator}, Input value: ${inputValue}`);
    
    if (operator === 'subtract' && operation === 'subtract') {
      setIsNegative(true);
      return;
    }
  
    if (firstOperand == null && !waitingForSecondOperand) {
      setFirstOperand(inputValue);
      setAllOperations(prev => [...prev, inputValue, operator]);
    } else if (operation) {
      const newAllOperations = [...allOperations, inputValue];
      let result = evaluateExpression(newAllOperations);
      result = Math.round(result * 10000) / 10000; 
      setDisplayValue(String(result));
      setFirstOperand(result);
      setAllOperations(prev => [result, operator]);
    }
  
    setWaitingForSecondOperand(true);
    setOperation(operator);
    setIsNegative(false);
  }
  
  const handleNumberClick = (number) => {
    console.log(`Number clicked: ${number}`);
    if (waitingForSecondOperand) {
      setDisplayValue(String(number));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(prev => prev === '0' ? String(number) : prev + String(number));
    }
  
    if (isNegative) {
      setDisplayValue(prev => '-' + prev);
      setIsNegative(false);
    }
  }
  
  const handleDecimalClick = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(prev => prev + '.');
    }
  }
  
  const handleEqualsClick = () => {
    const inputValue = parseFloat(displayValue);
    console.log(`Input value: ${inputValue}`);
    const newAllOperations = [...allOperations, inputValue];
  
    console.log(`Evaluating expression: ${newAllOperations.join(' ')}`);
    let result = evaluateExpression(newAllOperations);
    console.log(`Result before rounding: ${result}`);
    result = Math.round(result * 10000) / 10000; 
    console.log(`Result after rounding: ${result}`);
    setDisplayValue(String(result));
    setAllOperations([]);
    setFirstOperand(null);
    setOperation(null);
  }
  
  const evaluateExpression = (expression) => {
    let newExpression = [...expression];
  
    // First perform all multiplication and division operations
    for (let i = 1; i < newExpression.length; i += 2) {
      if (newExpression[i] === 'multiply' || newExpression[i] === 'divide') {
        const result = newExpression[i] === 'multiply'
          ? newExpression[i - 1] * newExpression[i + 1]
          : newExpression[i - 1] / newExpression[i + 1];
        newExpression.splice(i - 1, 3, result);
        i -= 2;
      }
    }
  
    // Then perform all addition and subtraction operations
    for (let i = 1; i < newExpression.length; i += 2) {
      if (newExpression[i] === 'add' || newExpression[i] === 'subtract') {
        const result = newExpression[i] === 'add'
          ? newExpression[i - 1] + newExpression[i + 1]
          : newExpression[i - 1] - newExpression[i + 1];
        newExpression.splice(i - 1, 3, result);
        i -= 2;
      }
    }
  
    return newExpression[0];
  }

  const handleClearClick = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperation(null);
    setAllOperations([]);
  }

  return (
    <div className="calculator">
      <h1>Javascript Calculator</h1>
      <div id="display" className="calculator-display">{displayValue}</div>
      <div className="calculator-keys">
        {numbers.map((number, index) => (
          <button id={number} key={index} onClick={() => handleNumberClick(index)} className="calculator-key number-key">{index}</button>
        ))}
        {operators.map((operator, index) => (
          <button id={operator} key={index} onClick={() => handleOperatorClick(operator)} className="calculator-key operator-key">{operator}</button>
        ))}
        <button id="decimal" onClick={handleDecimalClick} className="calculator-key decimal-key">.</button>
        <button id="clear" onClick={handleClearClick} className="calculator-key clear-key">Clear</button>
        <button id="equals" onClick={handleEqualsClick} className="calculator-key equals-key">=</button>
      </div>
    </div>
  )
}