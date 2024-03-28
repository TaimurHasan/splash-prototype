import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import AppText from './AppText';

const CustomTextInput = (props) => {
    const {
        id,
        label,
        labelStyle,
        error,
        value,
        setValue,
        customStyle,
        placeholder,
        secureTextEntry,
        validator,
    } = props;

    const [isError, setIsError] = useState(false);

    handleValueChange = (value) => {
        setValue(value);

        if(validator) {
            const isValid = validator(value);
            if (!isValid) {
                setIsError(true);
            } else {
                setIsError(false);
            }
        }
    };

    getBorderColor = (value, isError) => {
        color = '#686868';
        if (value) {
            color = isError ? '#FF7967' : '#87E4B7';
        };
        return color;
    }

    return (
        <View
            style={[customStyle, { borderBottomColor: getBorderColor(value, isError), borderBottomWidth: 0.5,}]}
        >
            {label &&
                <AppText
                    customStyle={labelStyle}
                    class='text-base'
                >
                    {label}
                </AppText>}
            <TextInput
                autoCapitalize='none'
                placeholder={placeholder}
                placeholderTextColor="#686868" 
                value={value}
                onChangeText={handleValueChange}
                style={
                    { color: '#FFFFFF', fontSize: 16 }
                }
                className='pt-1 pb-2 my-0'
                secureTextEntry={secureTextEntry}
                {...props}
            />
        </View>
    )
}

export default CustomTextInput;

const styles = StyleSheet.create({})