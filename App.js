import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';



export default function App() {
  return (<CalculatorScreen />);
}

const CalculatorScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Calculator />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

// Calculator.js

const Calculator = () => {
  // map calculator keys for type-safety
  const calculatorKeys = {
    numeric: {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    },
    operators: {
      add: '+',
      subtract: '-',
      multiply: 'x',
      divide: '/',
    },
    special: {
      clear: 'C',
      allClear: 'AC',
      equals: '=',
      decimal: '.',
      plusMinus: '+/-',
      percent: '%',
    }
  }

  const { outputValue, buttonPressed } = useCalculator(calculatorKeys);

  return (
    <View style={styles.view}>
      <ResultText>{outputValue}</ResultText>
      <CalculatorPad calculatorKeys={calculatorKeys} buttonPressed={buttonPressed} />
    </View>
  );
}

const ResultText = props => <Text style={styles.resultText}>{props.children}</Text>;

// CalculatorButtons

const DarkGreyButton = props => <Button style={styles.darkGreyButton} onPress={props.onPress} > {props.children} </Button>;

export const LongDarkGreyButton = props => <Button style={[styles.darkGreyButton, styles.longButton]} onPress={props.onPress} > {props.children}  </Button>;

export const LightGreyButton = props => <Button style={styles.lightGreyButton} textStyle={styles.lightGreyButtonText} onPress={props.onPress} > {props.children} </Button>;

export const BlueButton = props => <Button style={styles.blueButton} label={props.label} onPress={props.onPress} > {props.children} </Button>;

const Button = (props) => {
  const label = props.children;
  const style = props.style;
  const textStyle = props.textStyle;
  const onPress = props.onPress;

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
};
const SCREEN_WIDTH = Dimensions.get('window').width;

const BUTTON_WIDTH = SCREEN_WIDTH * 0.2;
const BUTTON_HEIGHT = BUTTON_WIDTH;
const BORDER_RADIUS = BUTTON_WIDTH / 2;

// CalculatorPad.js

const CalculatorPad = props => {
  const { calculatorKeys, buttonPressed } = props;

  const numericKeys = calculatorKeys.numeric;
  const operatorKeys = calculatorKeys.operators;
  const specialKeys = calculatorKeys.special;

  const createLightGreyButton = label => <LightGreyButton key={label} onPress={() => buttonPressed(label)}> {label} </LightGreyButton>;
  const createDarkGreyButton = label => <DarkGreyButton key={label} onPress={() => buttonPressed(label)}> {label} </DarkGreyButton>;
  const createBlueButton = label => <BlueButton key={label} onPress={() => buttonPressed(label)}> {label} </BlueButton>;
  const createLongDarkGreyButton = label => <LongDarkGreyButton key={label} onPress={() => buttonPressed(label)}> {label} </LongDarkGreyButton>;

  const clearButton = createLightGreyButton((answerValue === 0) ? calculatorKeys.special.allClear : calculatorKeys.special.clear);

  const firstRowButtons =
    [
      clearButton,
      createLightGreyButton(specialKeys.plusMinus),
      createLightGreyButton(specialKeys.percent),
      createBlueButton(operatorKeys.divide),
    ];

  const secondRowButtons =
    [
      createDarkGreyButton(numericKeys.seven),
      createDarkGreyButton(numericKeys.eight),
      createDarkGreyButton(numericKeys.nine),
      createBlueButton(operatorKeys.multiply),
    ];

  const thirdRowButtons =
    [
      createDarkGreyButton(numericKeys.four),
      createDarkGreyButton(numericKeys.five),
      createDarkGreyButton(numericKeys.six),
      createBlueButton(operatorKeys.subtract),
    ];

  const fourthRowButtons =
    [
      createDarkGreyButton(numericKeys.one),
      createDarkGreyButton(numericKeys.two),
      createDarkGreyButton(numericKeys.three),
      createBlueButton(operatorKeys.add),
    ];

  const fifthRowButtons =
    [
      createLongDarkGreyButton(numericKeys.zero),
      createDarkGreyButton(specialKeys.decimal),
      createBlueButton(specialKeys.equals),
    ];

  const rowButtons = [firstRowButtons, secondRowButtons, thirdRowButtons, fourthRowButtons, fifthRowButtons];

  return (
    <View >
      {rowButtons.map((buttonsInRow, i) => <Row key={i}>{buttonsInRow}</Row>)}
    </View>
  );

}

const Row = props => <View key={props.children} style={styles.row}>{props.children}</View>;

const useCalculator = calculatorKeys => {
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



const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
  },
  view: {
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
  button: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
  },
  longButton: {
    width: BUTTON_WIDTH * 2.25,
  },
  buttonText: {
    color: 'white',
    fontSize: SCREEN_WIDTH / 12,
  },

  darkGreyButton: {
    backgroundColor: '#333333',
  },

  lightGreyButton: {
    backgroundColor: '#A6A6A6',
  },
  lightGreyButtonText: {
    color: 'black',
  },
  blueButton: {
    backgroundColor: '#0A84E3',
  },
});

