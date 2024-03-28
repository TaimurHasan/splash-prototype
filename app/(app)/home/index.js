import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppText from '../../components/AppText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { brandingColors } from '../../utils/config';
import { QUERY_MY_NOTIFICATIONS } from '../../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { setNotifications } from '../../actions/Auth';

const Home = () => {
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { state, dispatch, logout } = useContext(AuthContext);

    const [loadNotifications, { data, loading }] = useLazyQuery(QUERY_MY_NOTIFICATIONS);

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
    }, [data, loading]);

    return (
        <>
            <StatusBar style='light' />
            {/* <SafeAreaView className='bg-black flex-1 justify-center' style={{height: hp(100)}}> */}
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
            {/* </SafeAreaView> */}
        </>
    )
}

export default Home;

const styles = StyleSheet.create({
    buttonView: { position: 'absolute', top: hp(70), left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }
})