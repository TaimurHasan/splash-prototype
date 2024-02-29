import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import AppText from '../components/AppText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, useRouter } from 'expo-router';
import auth from '../utils/auth';
import { AuthContext } from '../context/AuthContext';

const home = () => {
    const router = useRouter();
    const { logout } = useContext(AuthContext);
    const performLogout = () => {
        logout();
        router.push('/', {disabledAnimation: true});
    };
    return (
        <SafeAreaView>
            <TouchableOpacity
                onPress={() => performLogout()}
                style={{height: hp(6), width: wp(80), borderRadius: '5px'}}
                className="flex items-center justify-center mx-auto"
            >
                <AppText 
                class='text-black text-base'
                >
                    Logout
                </AppText>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default home

const styles = StyleSheet.create({})