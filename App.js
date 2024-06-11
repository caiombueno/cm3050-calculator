import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { DarkGreyButton, LightGreyButton, BlueButton, LongDarkGreyButton } from './src/components/buttons';
import { SCREEN_WIDTH } from './src/consts/screen-width';



export default function App() {
  [answerValue, setAnswerValue] = useState(0);
  [readyToReplace, setReadyToReplace] = useState(true);
  [memoryValue, setMemoryValue] = useState(0);
  [operatorValue, setOperatorValue] = useState(0);

  const OPERATORS = {
    add: '+',
    subtract: '-',
    multiply: 'x',
    divide: '/',
  }

  const handleNumber = number => {
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

    switch (operatorValue) {
      case OPERATORS.add: return previous + current;
      case OPERATORS.subtract: return previous - current;
      case OPERATORS.multiply: return previous * current;
      case OPERATORS.divide: return previous / current;
    }
  };

  const buttonPressed = value => {
    const isOperator = Object.values(OPERATORS).includes(value);
    const isNumber = !isNaN(value);

    if (isNumber) {
      handleNumber(value);
    } else if (value === 'C' || value === 'AC') {
      clearState();
    } else if (isOperator) {
      const result = (operatorValue !== 0) ? calculateEquals() : null;
      handleOperator(value);
      if (result) setMemoryValue(result);
    } else if (value === '=') {
      setAnswerValue(calculateEquals());
      setMemoryValue(0);
      setReadyToReplace(true);
    } else if (value === '+/-') {
      setAnswerValue(answerValue * -1);
    }
    else if (value === '%') {
      setAnswerValue(answerValue / 100);
    }

  };

  const createButtons = () => {

    const createLightGreyButton = label => <LightGreyButton key={label} onPress={() => buttonPressed(label)}> {label} </LightGreyButton>;
    const createDarkGreyButton = label => <DarkGreyButton key={label} onPress={() => buttonPressed(label)}> {label} </DarkGreyButton>;
    const createBlueButton = label => <BlueButton key={label} onPress={() => buttonPressed(label)}> {label} </BlueButton>;
    const createLongDarkGreyButton = label => <LongDarkGreyButton key={label} onPress={() => buttonPressed(label)}> {label} </LongDarkGreyButton>;

    const clearButton = createLightGreyButton((answerValue === 0) ? 'AC' : 'C');

    const firstRowButtons =
      [
        clearButton,
        createLightGreyButton('+/-'),
        createLightGreyButton('%'),
        createBlueButton(OPERATORS.divide),
      ];

    const secondRowButtons =
      [
        createDarkGreyButton('7'),
        createDarkGreyButton('8'),
        createDarkGreyButton('9'),
        createBlueButton(OPERATORS.multiply),
      ];

    const thirdRowButtons =
      [
        createDarkGreyButton('4'),
        createDarkGreyButton('5'),
        createDarkGreyButton('6'),
        createBlueButton(OPERATORS.subtract),
      ];

    const fourthRowButtons =
      [
        createDarkGreyButton('1'),
        createDarkGreyButton('2'),
        createDarkGreyButton('3'),
        createBlueButton(OPERATORS.add),
      ];

    const fifthRowButtons =
      [
        createLongDarkGreyButton('0'),
        createDarkGreyButton('.'),
        createBlueButton('='),
      ];

    return [firstRowButtons, secondRowButtons, thirdRowButtons, fourthRowButtons, fifthRowButtons];
  }

  const createRow = (index, buttons) => <Row key={index}>{buttons}</Row>;
  const buttons = createButtons();

  return (
    <SafeAreaView style={styles.container}>
      <ResultText>{answerValue}</ResultText>
      {buttons.map((button, i) => createRow(i, button))}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const Row = props => <View key={props.children} style={styles.row}>{props.children}</View>;

const ResultText = props => <Text style={styles.resultText}>{props.children}</Text>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
  },
  resultText: {
    color: 'white',
    fontSize: SCREEN_WIDTH / 8,
    margin: '5%',
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
