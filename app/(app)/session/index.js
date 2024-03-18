import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppText from '../../components/AppText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { sessionSchema } from '../../../assets/sessionSchema';
import { socket, subscribeToTimer } from '../../utils/api';
import { StatusBar } from 'expo-status-bar';
import Header from '../../components/Header';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { ADD_SESSION, END_SESSION } from '../../utils/mutations';
import { ActiveContext } from '../../context/ActiveContext';

const Session = () => {
    const router = useRouter();
    const { isActive, setActive } = useContext(ActiveContext);
    const { data: userData } = useQuery(QUERY_ME);
    const [ endSession, { error: endSessionError }] = useMutation(END_SESSION);

    const onEnd = async () => {
        try {
            const { data } = await endSession({
                variables: { username: userData?.me?.username }
            })
            if(data) {
                setActive(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <StatusBar style='light'/>
            <Header headerText='Session' showBack={false}/>
            <View className='bg-black flex items-center' style={{height: hp(100)}}>
                {!isActive &&
                    <View class="flex items-center">
                        <AppText class='text-white text-base mt-20'>No active session</AppText>
                    </View>
                }
                <View className="absolute mx-auto" style={styles.buttonView}>
                    <TouchableOpacity
                        style={{height: 53 , width: 360 , borderRadius: '5px'}}
                        className="flex bg-splash-greenbtn items-center justify-center mx-auto mb-10"
                        onPress={() => isActive ? onEnd() : router.push('/session/Start')}
                    >
                        <AppText 
                            class='text-black text-base'
                            bold={true}
                        >
                            {isActive === true ? 'End Session' : 'Start Session'}
                        </AppText>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Session;

const styles = StyleSheet.create({
    buttonView: { top: hp(70), left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }
})