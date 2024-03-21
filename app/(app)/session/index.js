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
import { SessionContext } from '../../context/SessionContext';
import Loading from '../../components/Loading';
import { setIsActive } from '../../actions/Session';

const Session = () => {
    const router = useRouter();
    const { state, dispatch, isLoading } = useContext(SessionContext);
    const { data: userData } = useQuery(QUERY_ME);
    const [ endSession, { error: endSessionError }] = useMutation(END_SESSION);
    const onEnd = async () => {
        try {
            const { data } = await endSession({
                variables: { username: userData?.me?.username }
            })
            if(data) {
                dispatch(setIsActive(false));
            }
        } catch (e) {
            console.log(e);
        }
        // router.push('/session')
    };

    const openStart = () => {
        // router.push('/');
        router.push('./session/Start');
    }

    if(state.isLoading) {
        return (
          <View 
            className='h-full bg-black flex justify-center items-center'
            style={{ alignItems: 'center' }}
          >
            <Loading />
          </View>
        )
    };
    return (
        <>
            <StatusBar style='light'/>
            <Header headerText='Session' showBack={false}/>
            <View className='bg-black flex items-center' style={{height: hp(100)}}>
                {!state.isActive &&
                    <View class="flex items-center">
                        <AppText class='text-white text-base mt-20'>No active session</AppText>
                    </View>
                }
                <View className="absolute mx-auto" style={styles.buttonView}>
                    <TouchableOpacity
                        style={{height: 53 , width: 360 , borderRadius: '5px'}}
                        className={`flex ${state.isActive ? 'bg-splash-redbtn' : 'bg-splash-greenbtn' } items-center justify-center mx-auto mb-10`}
                        onPress={() => state?.isActive ? onEnd() : openStart()}
                    >
                        <AppText 
                            class='text-black text-base'
                            bold={true}
                        >
                            {state.isActive === true ? 'End Session' : 'Start Session'}
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