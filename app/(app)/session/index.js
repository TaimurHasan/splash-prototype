import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AppText from '../../components/AppText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { sessionSchema } from '../../../assets/sessionSchema';
import { socket, subscribeToTimer } from '../../utils/api';
import { StatusBar } from 'expo-status-bar';
import Header from '../../components/Header';
import { useLazyQuery, useMutation } from '@apollo/client';
import { END_SESSION } from '../../utils/mutations';
import Loading from '../../components/Loading';
import { setActiveSessionId, setIsActive } from '../../actions/Auth';
import { AuthContext } from '../../context/AuthContext';
import { QUERY_ACTIVE_SESSION } from '../../utils/queries';
import { addPlayerToList } from '../../actions/Session';
import { SessionContext } from '../../context/SessionContext';

const Session = () => {
    const router = useRouter();
    const { state, dispatch } = useContext(AuthContext);
    const { dispatch: sessionDispatch } = useContext(SessionContext);
    const [loadActiveSession, { data, loading }] = useLazyQuery(QUERY_ACTIVE_SESSION, {
        // fetchPolicy: 'cache-and-network',
        variables: { id: state.activeSessionId },
    });
    const [ endSession, { error: endSessionError }] = useMutation(END_SESSION);
    const onEnd = async () => {
        try {
            const { data } = await endSession({
                variables: { sessionId: state.activeSessionId }
            })
            if(data) {
                dispatch(setIsActive(false));
                dispatch(setActiveSessionId(null));
            }
        } catch (e) {
            console.log(e);
        }
        // router.push('/session')
    };

    const openStart = () => {
        // sessionDispatch(addPlayerToList(state.userId));
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

    useEffect(() => {
        if(state.activeSessionId) {
            loadActiveSession();
        }
    }, [state]);

    return (
        <>
            <StatusBar style='light'/>
            {/* <Header headerText='Session' showBack={false}/> */}
            <View className='bg-black flex items-center' style={{height: hp(100)}}>
                {!state.isActive &&
                    <View class="flex items-center">
                        <AppText class='text-white text-base mt-20'>No active session</AppText>
                    </View>
                }
                {state.isActive && !loading &&
                    <View class="flex items-center">
                        <AppText class='text-white text-base mt-20'>{data?.activeSession?.startedAt}</AppText>
                    </View>
                }
                <View className="absolute mx-auto" style={styles.buttonView}>
                    <TouchableOpacity
                        style={{height: hp(6.220657) , width: wp(91.6) , borderRadius: '5px'}}
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
    buttonView: { position: 'absolute', top: hp(70), left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }
})