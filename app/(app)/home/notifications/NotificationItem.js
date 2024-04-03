import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
// import AppText from '../../../../components/AppText'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { brandingColors } from '../../../utils/config';
import { TouchableOpacity } from 'react-native';
import AppText from '../../../components/AppText';
import { useMutation } from '@apollo/client';
import { JOIN_SESSION } from '../../../api/mutations/activeSession';
import { UserContext } from '../../../context/UserContext';
import { setActiveSessionId, setIsActive } from '../../../actions/User';

const NotificationItem = (props) => {
    const { dispatch } = useContext(UserContext);
    const [ joinSession, { error }] = useMutation(JOIN_SESSION);

    const {
        _id,
        senderId,
        type,
        isActivated,
        sessionId,
    } = props.notifDetails;

    const handleJoinSession = async () => {
        try {
            const { data } = await joinSession({
                variables: { sessionId }
            })
            if(data) {
                dispatch(setIsActive(true));
                dispatch(setActiveSessionId(data.joinSession._id));
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View 
            key={_id}
            className='flex justify-center items-center'
            style={{
                padding: hp(2),
                borderBottomWidth: 2,
                borderBottomColor: brandingColors.splashGray
            }}
        >
            <AppText class='text-white text-base mb-4'>
                <AppText bold={true}>{senderId?.username}</AppText> has invited you to join a game.
            </AppText>
            <View className="mx-auto pb-0">
                <TouchableOpacity
                    style={{height: hp(4.220657) , width: wp(50) , borderRadius: '5px'}}
                    className={`flex bg-splash-greenbtn items-center justify-center mx-auto`}
                    onPress={handleJoinSession}
                >
                    <AppText 
                        class='text-black text-base'
                        bold={true}
                    >
                        Join
                    </AppText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NotificationItem

const styles = StyleSheet.create({})