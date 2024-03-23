import { Keyboard, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppText from '../../components/AppText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { friends, sessionSchema } from '../../../assets/sessionSchema';
import { socket, subscribeToTimer } from '../../utils/api';
import { StatusBar } from 'expo-status-bar';
import Header from '../../components/Header';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { ADD_SESSION, END_SESSION } from '../../utils/mutations';
import { SessionContext } from '../../context/SessionContext';
import { setIsActive } from '../../actions/Session';
import { AuthContext } from '../../context/AuthContext';
import Friend from './sessionComponents/Friend';
import { AntDesign } from '@expo/vector-icons';

const Start = () => {
    const router = useRouter();
    const { state, dispatch } = useContext(AuthContext);
    const { state: sessionState } = useContext(SessionContext);
    const { data: userData } = useQuery(QUERY_ME);
    const [ addSession, { error }] = useMutation(ADD_SESSION);
    const [ endSession, { error: endSessionError }] = useMutation(END_SESSION);
    const [searchList, setSearchList] = useState(friends);
    const [searchInput, setSearchInput] = useState('');

    // if(state.isLoading) {
    //     return (
    //       <View 
    //         className='h-full bg-black flex justify-center items-center'
    //         style={{ alignItems: 'center' }}
    //       >
    //         <Loading />
    //       </View>
    //     )
    // };

    // useEffect(() => {
        
    // }, [authState])
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
                dispatch(setIsActive(true));
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleValueChange = (value) => {
        setSearchInput(value);
        let newList = [...friends].filter(({ username }) => username.toLowerCase().includes(value));
        setSearchList(newList);
    };

    return (
        <>
            <StatusBar style='light'/>
            <View className='flex-1 bg-black' style={{height: hp(100)}}>
                        <View className="mx-auto bg-splash-gray mt-5 flex-row items-center justify-between" style={{ height: hp(4), width: wp(91.6), borderRadius: '5px' }}>
                            <AntDesign name="search1" size={20} color="gray" style={{marginLeft: 10}} />
                            <TextInput
                                type='text'
                                style={{width: wp(80), color: '#FFFFFF', fontSize: 16}}
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholder={'Search...'}
                                placeholderTextColor="#686868" 
                                value={searchInput}
                                onChangeText={handleValueChange}
                                onBlur={Keyboard.dismiss}
                            />
                        </View>
                <View className='flex-1' style={{ marginBottom: hp(8.7)}}>
                    <ScrollView className="mx-auto my-4 flex" style={{ width: wp(91.6), borderRadius: '5px' }}>
                        {searchList.map((friend) => (
                            <View key={friend._id}>
                                <Friend friend={friend}/>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View className="absolute mx-auto" style={styles.buttonView}>
                    <TouchableOpacity
                        style={{height: hp(6.220657) , width: wp(91.6), borderRadius: '5px'}}
                        className="flex bg-splash-greenbtn items-center justify-center items-center mx-auto mb-10"
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
    buttonView: { top: hp(70), left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }
})