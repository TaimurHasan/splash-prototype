import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import AppText from '../../../components/AppText';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { brandingColors } from '../../../utils/config';
import Checkbox from 'expo-checkbox';
import AppCheckbox from '../../../components/AppCheckbox';
import { SessionContext } from '../../../context/SessionContext';
import { addPlayerToList, setPlayersToAdd } from '../../../actions/Session';

const Friend = (props) => {
    const {
        username,
        _id,
    } = props.friend;
    const { state, dispatch } = useContext(SessionContext);
    const { playersToAdd } = state;
    const added = playersToAdd.includes(_id);

    const handleAdd = (id) => {
        if(added) {
            const index = playersToAdd.indexOf(id);
            const newPlayers = [...playersToAdd];
            newPlayers.splice(index, 1);
            dispatch(setPlayersToAdd(newPlayers));
        } else {
            dispatch(addPlayerToList(id));
        }
    };
    return (
        <View className='flex-row justify-between items-center p-2 mt-3' style={{borderRadius: '5px', bottomBorderWidth: 2, borderBottomColor: 'red'}}>
            <AppText class='text-white text-base px-2'>{username}</AppText>
            <AppCheckbox
                disabled={false}
                value={true}
                checked={playersToAdd.includes(_id)}
                setChecked={() => handleAdd(_id)}
                color={brandingColors.splashGreenbtn}
                customStyle={styles.checkboxBase}
            />
        </View>
    )
}

export default Friend

const styles = StyleSheet.create({
    checkboxBase: {
        width: 24,
        height: 24,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: brandingColors.splashGreenbtn,
        backgroundColor: 'transparent',
    },
})