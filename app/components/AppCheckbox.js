import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import React from 'react'
import { brandingColors } from '../utils/config';

const AppCheckbox = (props) => {
    const {
        checked,
        setChecked,
        customStyle,
    } = props;

    return (
      <Pressable
        style={[customStyle, checked && styles.checkboxChecked]}
        onPress={() => setChecked()}>
        {checked && <Feather name="check" size={18} color="black" />}
      </Pressable>
    );
}

export default AppCheckbox

const styles = StyleSheet.create({
        checkboxChecked: {
            backgroundColor: brandingColors.splashGreenbtn,
        },
        appContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        appTitle: {
            marginVertical: 16,
            fontWeight: 'bold',
            fontSize: 24,
        },
        checkboxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
})