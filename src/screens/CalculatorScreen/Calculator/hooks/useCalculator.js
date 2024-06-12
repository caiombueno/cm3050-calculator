import { useState } from 'react';

export const useCalculator = calculatorKeys => {
    [answerValue, setAnswerValue] = useState(0);
    [readyToReplace, setReadyToReplace] = useState(true);
    [memoryValue, setMemoryValue] = useState(0);
    [operatorValue, setOperatorValue] = useState(0);

    const handleNumericInput = number => {
        let newAnswerValue;
        if (readyToReplace) {
            setReadyToReplace(false);
            newAnswerValue = number;
        } else {
            newAnswerValue = answerValue + number;
        }
        setAnswerValue(newAnswerValue);
    };

    const clearState = () => {
        setAnswerValue(0);
        setMemoryValue(0);
        setOperatorValue(0);
        setReadyToReplace(true);
    };

    const handleOperator = operator => {
        setMemoryValue(answerValue);
        setOperatorValue(operator);
        setReadyToReplace(true);
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
        }
    };

    const buttonPressed = value => {
        const isNumber = Object.values(calculatorKeys.numeric).includes(value);
        const isOperator = Object.values(calculatorKeys.operators).includes(value);

        const specialKeys = calculatorKeys.special;

        if (isNumber) {
            handleNumericInput(value);
        } else if (value === specialKeys.clear || value === specialKeys.allClear) {
            clearState();
        } else if (isOperator) {
            const result = (operatorValue !== 0) ? calculateEquals() : null;
            handleOperator(value);
            if (result) setMemoryValue(result);
        } else if (value === specialKeys.equals) {
            setAnswerValue(calculateEquals());
            setMemoryValue(0);
            setReadyToReplace(true);
        } else if (value === specialKeys.plusMinus) {
            setAnswerValue(answerValue * -1);
        }
        else if (value === specialKeys.percent) {
            setAnswerValue(answerValue / 100);
        }
    };

    return { answerValue, buttonPressed };
};