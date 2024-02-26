import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackButton from '../assets/icons/back.svg';
import AppText from './components/AppText'

const signup = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-black flex" edges={['top']}>
            <StatusBar translucent backgroundColor={'white'} style='light' />

            <View 
                className="h-10 flex-row justify-between items-center bg-splash-gray"
                style={{width: wp(100), height: hp(6)}}
            >
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="pl-7 absolute"
                    style={{zIndex: 1}}
                >
                    <View>
                        <BackButton width={20} height={20} />
                    </View>
                </TouchableOpacity>
                <View
                    style={{width: wp(100)}}
                    className="flex justify-center items-center"
                >
                    <AppText 
                        class="color-splash-text-green text-base"
                    >
                        Sign Up
                    </AppText>
                </View>
            </View>
            
        </SafeAreaView>
    )
}

export default signup

const styles = StyleSheet.create({})