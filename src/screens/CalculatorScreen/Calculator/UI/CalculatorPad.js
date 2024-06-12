import { View, StyleSheet } from 'react-native';
import { DarkGreyButton, LightGreyButton, BlueButton, LongDarkGreyButton } from './CalculatorButtons';


export const CalculatorPad = props => {
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

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

