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

const Start = () => {
    const router = useRouter();
    const { isActive, setActive  } = useContext(ActiveContext);
    const { data: userData } = useQuery(QUERY_ME);
    const [ addSession, { error }] = useMutation(ADD_SESSION);
    const [ endSession, { error: endSessionError }] = useMutation(END_SESSION);

    // const startTime = (new Date() - new Date(sessionSchema[0].startedAt))/(1000);
    // const [timer, setTimer] = useState(0);

    // useEffect(() => {
    //     intervalId = setInterval(() => setTimer(timer + 1), 1000);
    //     return () => clearInterval(intervalId);
    // }, [timer])
    // useEffect(() => {
    //     socket.emit('subscribeToTimer', 1000);
    // }, []);
    
    // useEffect(() => {
    //     socket.emit('subscribeToTimer', 1000);
    //     const setTimerEvent = (value) => {
    //         setTimer(value);
    //     };
    //     socket.on('timer', setTimerEvent);
    //     return () => {
    //         socket.off('timer', setTimerEvent);
    //     }
    // }, []);
    // useEffect(() => {
    //     const { data } = useQuery(QUERY_ME);
    //     if(data?.me?.isActive === 'true') {
    //         setIsActive(true);
    //     } else {
    //         setIsActive(false);
    //     }
    // }, [])
    const onStart = async () => {
        try {
            const { data } = await addSession({
                variables: { username: userData?.me?.username }
            })
            if(data) {
                setActive(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <StatusBar style='light'/>
            <Header headerText='Start Session' showBack={true} />
            <View className='bg-black' style={{height: hp(100)}}>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={{height: 53 , width: 360 , borderRadius: '5px'}}
                        className="flex bg-splash-greenbtn items-center justify-center mx-auto mb-10"
                        onPress={onStart}
                    >
                        <AppText 
                            class='text-black text-base'
                            bold={true}
                        >
                            Continue
                        </AppText>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Start;

const styles = StyleSheet.create({
    buttonView: { top: hp(70), justifyContent: 'center', alignItems: 'center' }
})