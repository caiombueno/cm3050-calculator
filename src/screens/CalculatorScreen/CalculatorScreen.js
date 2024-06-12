import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Calculator } from './Calculator/UI/Calculator';

export const CalculatorScreen = () => {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Calculator />
            <StatusBar style="light" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'flex-end',
    },
});

