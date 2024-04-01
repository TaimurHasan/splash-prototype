import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppText from '../../components/AppText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { UserContext } from '../../context/UserContext';
import { StatusBar } from 'expo-status-bar';
import { brandingColors } from '../../utils/config';
import { useLazyQuery } from '@apollo/client';
import { setNotifications, setUnreadNotifications } from '../../actions/User';
import { QUERY_MY_NOTIFICATIONS } from '../../api/queries/notification';

const Home = () => {
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { state, dispatch, logout } = useContext(UserContext);

    const [loadNotifications, { data, loading }] = useLazyQuery(QUERY_MY_NOTIFICATIONS, {
        fetchPolicy: 'cache-and-network',
    });

    const performLogout = () => {
        logout();
        router.replace('/hero', {disabledAnimation: true});
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    const onRefresh = () => {
        loadNotifications();
    };

    useEffect(() => {
        dispatch(setNotifications(data?.myNotifications));
        data?.myNotifications?.forEach(({ _id, isRead }) => {
            if(!isRead && !state?.unreadNotifications?.includes(_id)) {
                dispatch(setUnreadNotifications([...state.unreadNotifications, _id]));
            }
        });
    }, [data, loading]);

    return (
        <>
            <StatusBar style='light' />
            <ScrollView
                className='flex-1 mt-0 bg-black'
                style={{height: hp(100)}}
                refreshControl={
                    <RefreshControl 
                        style={{marginTop: 0}}
                        tintColor={brandingColors.splashGreenbtn}
                        refreshing={isRefreshing} 
                        onRefresh={onRefresh} 
                    />
                }
            >
            </ScrollView>
            <View className="absolute mx-auto" style={styles.buttonView}>
                <TouchableOpacity
                    onPress={() => performLogout()}
                    style={{height: hp(6.220657) , width: wp(91.6), borderRadius: '5px'}}
                    className="flex bg-splash-greenbtn items-center justify-center mx-auto"
                >
                    <AppText 
                    class='text-black text-base'
                    >
                        Logout
                    </AppText>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Home;

const styles = StyleSheet.create({
    buttonView: { position: 'absolute', top: hp(70), left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }
})