import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '../../../components/AppText';

const PlayerCard = (props) => {
    const {
        user,
        FGM,
        FGA,
        TPM,
        BLK,
        PTS,
        REB,
        STL,
    } = props.stats;
    const statsLine = `${PTS} pts, ${FGM}/${FGA} FGM, ${TPM} 3PM, ${REB} REB, ${BLK} BLK, ${STL} STL`
    return (
        <View className='flex flex-row items-center'>
            <View>
                <Image style={{height: 43, width: 43, borderRadius: 100}} className='mr-3' source={require('../../../../assets/images/default-profile.png')} />
            </View>
            <View className='py-3'>
                <AppText class='text-white text-base' bold={true}>{user.username}</AppText>
                <AppText class='text-white' customStyle={{fontSize: 14}}>
                    {statsLine}
                </AppText>
            </View>
        </View>
    )
}

export default PlayerCard

const styles = StyleSheet.create({})