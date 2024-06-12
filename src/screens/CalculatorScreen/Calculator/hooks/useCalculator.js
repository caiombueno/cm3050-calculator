import { useState } from 'react';

export const useCalculator = calculatorKeys => {
    [answerValue, setAnswerValue] = useState(0);
    [readyToReplaceAnswerValue, setReadyToReplaceAnswerValue] = useState(true);
    [readyToReplaceOutputValue, setReadyToReplaceOutputValue] = useState(true);
    [memoryValue, setMemoryValue] = useState(0);
    [operatorValue, setOperatorValue] = useState(null);
    [outputValue, setOutputValue] = useState('0');  // Initialize outputValue to '0'

    const appendToEquation = value => setOutputValue(prev => `${prev} ${value}`.trim());

    const handleNumericInput = number => {
        let newAnswerValue;

        if (readyToReplaceAnswerValue) {
            setReadyToReplaceAnswerValue(false);
            newAnswerValue = number;
            if (readyToReplaceOutputValue) {
                setOutputValue(number.toString());
            } else {
                appendToEquation(number);
            }
        } else {
            newAnswerValue = answerValue.toString() + number.toString();
            setOutputValue(prev => `${prev}${number}`);
        }
        setAnswerValue(newAnswerValue);
    };

    const clearState = () => {
        setAnswerValue(0);
        setMemoryValue(0);
        setOperatorValue(null);
        setOutputValue('0');  // Reset outputValue to '0'
        setReadyToReplaceAnswerValue(true);
        setReadyToReplaceOutputValue(true);
    };

    const handleOperatorInput = operator => {
        if (operatorValue) {
            const result = calculateEquals();
            setAnswerValue(result);
            setMemoryValue(result);
            setOutputValue(result.toString());
        } else {
            setMemoryValue(answerValue);
        }
        setOperatorValue(operator);
        setReadyToReplaceAnswerValue(true);
        setReadyToReplaceOutputValue(false);
        appendToEquation(operator);
    };

    const calculateEquals = () => {
        const previous = parseFloat(memoryValue);
        const current = parseFloat(answerValue);
        const operatorKeys = calculatorKeys.operators;

        switch (operatorValue) {
            case operatorKeys.add: return previous + current;
            case operatorKeys.subtract: return previous - current;
            case operatorKeys.multiply: return previous * current;
            case operatorKeys.divide: return previous / current;
            default: return current;
        }
    };

    const toggleSign = () => {
        const parts = outputValue.trim().split(' ');
        const lastNumber = parts.pop();
        const invertedNumber = (parseFloat(lastNumber) * -1).toString();
        parts.push(invertedNumber);

        const newOutputValue = parts.join(' ');
        setOutputValue(newOutputValue);
        setAnswerValue(invertedNumber);
    };

    const handlePercentage = () => {
        const parts = outputValue.trim().split(' ');
        const lastNumber = parts.pop();
        const percentageNumber = (parseFloat(lastNumber) / 100).toString();
        parts.push(percentageNumber);
        const newOutputValue = parts.join(' ');
        setOutputValue(newOutputValue);
        setAnswerValue(percentageNumber);
    };

    const handleEquals = () => {
        const result = calculateEquals();
        setAnswerValue(result);
        setMemoryValue(0);
        setReadyToReplaceAnswerValue(true);
        setReadyToReplaceOutputValue(true);
        setOperatorValue(null);
        setOutputValue(result.toString());
    };

    const buttonPressed = input => {
        const isNumber = Object.values(calculatorKeys.numeric).includes(input);
        const isOperator = Object.values(calculatorKeys.operators).includes(input);
        const specialKeys = calculatorKeys.special;

        if (isNumber) {
            handleNumericInput(input);
        } else if (input === specialKeys.clear || input === specialKeys.allClear) {
            clearState();
        } else if (isOperator) {
            handleOperatorInput(input);
        } else if (input === specialKeys.equals) {
            handleEquals();
        } else if (input === specialKeys.plusMinus) {
            toggleSign();
        } else if (input === specialKeys.percent) {
            handlePercentage();
        }
    };

    return { outputValue, buttonPressed };
};