import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { Manrope_400Regular, Manrope_600SemiBold } from '@expo-google-fonts/manrope';

const AppText = (props) => {
    const [fontsLoaded] = useFonts({
        Manrope_400Regular,
        Manrope_600SemiBold,
    });


    if(!fontsLoaded) {
        return null;
    }

    return (
        <Text
            style={{ ...props.customStyle, fontFamily: props.bold ? 'Manrope_600SemiBold' : 'Manrope_400Regular' }}
            className={props.class}
        >
            {props.children}
        </Text>
    )
}

export default AppText

const styles = StyleSheet.create({})