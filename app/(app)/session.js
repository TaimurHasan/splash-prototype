import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppText from '../components/AppText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AuthContext } from '../context/AuthContext';
import { sessionSchema } from '../../assets/sessionSchema';
import { socket, subscribeToTimer } from '../utils/api';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const home = () => {
    const router = useRouter();
    const { logout } = useContext(AuthContext);
    const { data } = useQuery(QUERY_ME);
    console.log(data);
    const startTime = (new Date() - new Date(sessionSchema[0].startedAt))/(1000);
    const [timer, setTimer] = useState(0);
    const performLogout = () => {
        logout();
        router.push('/hero', {disabledAnimation: true});
    };

    // useEffect(() => {
    //     intervalId = setInterval(() => setTimer(timer + 1), 1000);
    //     return () => clearInterval(intervalId);
    // }, [timer])
    // useEffect(() => {
    //     socket.emit('subscribeToTimer', 1000);
    // }, []);
    
    useEffect(() => {
        socket.emit('subscribeToTimer', 1000);
        const setTimerEvent = (value) => {
            setTimer(value);
        };
        socket.on('timer', setTimerEvent);
        return () => {
            socket.off('timer', setTimerEvent);
        }
    }, []);

    return (
        <>
            <StatusBar style='light'/>
            <Header headerText='Session' showBack={false}/>
            <View className='bg-black flex justify-end' style={{height: hp(80)}}>
                <TouchableOpacity
                    style={{height: hp(6), width: wp(90), borderRadius: '5px'}}
                    className="flex bg-splash-greenbtn items-center justify-center mx-auto mb-10"
                >
                    <AppText 
                    class='text-black text-base'
                    >
                        {data.me.username === '' ? '' : 'Start Session'}
                    </AppText>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default home

const styles = StyleSheet.create({})