import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import BackBtnSvg from '../../assets/icons/back.svg';

const BackButton = (props) => {
    const {
        backFunction,
    } = props;
    const router = useRouter();

    const handleBack = () => {
        router.back()
        if(backFunction) {
            backFunction();
        }
    };

    return (
        <TouchableOpacity
            onPress={() => handleBack()}
            className="pl-6 absolute"
            style={{zIndex: 1}}
        >
            <View>
                <BackBtnSvg width={20} height={20} />
            </View>
        </TouchableOpacity>
    )
}

export default BackButton;

const styles = StyleSheet.create({})