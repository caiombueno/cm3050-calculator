import { StyleSheet, Text, View } from 'react-native';
import { useCalculator } from '../hooks/useCalculator';
import { DarkGreyButton, LightGreyButton, BlueButton, LongDarkGreyButton } from './CalculatorButtons';
import { SCREEN_WIDTH } from '../../../../consts/screen-width';


export const Calculator = () => {
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

    const { answerValue, buttonPressed } = useCalculator(calculatorKeys);

    return (
        <View style={styles.view}>
            <ResultText>{answerValue}</ResultText>
            <CalculatorPad calculatorKeys={calculatorKeys} buttonPressed={buttonPressed} />
        </View>
    );
}

const ResultText = props => <Text style={styles.resultText}>{props.children}</Text>;

const CalculatorPad = props => {
    const { calculatorKeys, buttonPressed } = props;

    const createButtons = () => {

        const createLightGreyButton = label => <LightGreyButton key={label} onPress={() => buttonPressed(label)}> {label} </LightGreyButton>;
        const createDarkGreyButton = label => <DarkGreyButton key={label} onPress={() => buttonPressed(label)}> {label} </DarkGreyButton>;
        const createBlueButton = label => <BlueButton key={label} onPress={() => buttonPressed(label)}> {label} </BlueButton>;
        const createLongDarkGreyButton = label => <LongDarkGreyButton key={label} onPress={() => buttonPressed(label)}> {label} </LongDarkGreyButton>;

        const numericKeys = calculatorKeys.numeric;
        const operatorKeys = calculatorKeys.operators;
        const specialKeys = calculatorKeys.special;

        const clearButton = createLightGreyButton((answerValue === 0) ? calculatorKeys.special.allClear : calculatorKeys.special.clear);

        const firstRowButtons =
            [
                clearButton,
                createLightGreyButton('+/-'),
                createLightGreyButton('%'),
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

        return [firstRowButtons, secondRowButtons, thirdRowButtons, fourthRowButtons, fifthRowButtons];
    }

    const createRow = (index, buttons) => <Row key={index}>{buttons}</Row>;
    const buttons = createButtons();

    return (
        <View >
            {buttons.map((button, i) => createRow(i, button))}
        </View>
    );

}

const Row = props => <View key={props.children} style={styles.row}>{props.children}</View>;


const styles = StyleSheet.create({
    view: {
        // flex: 1,
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

