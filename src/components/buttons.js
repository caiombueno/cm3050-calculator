import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { SCREEN_WIDTH } from '../consts/screen-width';


export const DarkGreyButton = props => <Button style={styles.darkGreyButton} onPress={props.onPress} > {props.children} </Button>;

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

const BUTTON_WIDTH = SCREEN_WIDTH * 0.2;
const BUTTON_HEIGHT = BUTTON_WIDTH;
const BORDER_RADIUS = BUTTON_WIDTH / 2;

const styles = StyleSheet.create({
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
