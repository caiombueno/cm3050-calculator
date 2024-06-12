import { StyleSheet, Text, View } from 'react-native';
import { useCalculator } from '../hooks/useCalculator';
import { CalculatorPad } from './CalculatorPad';
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

    const { outputValue, buttonPressed } = useCalculator(calculatorKeys);

    return (
        <View style={styles.view}>
            <ResultText>{outputValue}</ResultText>
            <CalculatorPad calculatorKeys={calculatorKeys} buttonPressed={buttonPressed} />
        </View>
    );
}

const ResultText = props => <Text style={styles.resultText}>{props.children}</Text>;

const styles = StyleSheet.create({
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
});

