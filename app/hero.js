import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StyleSheet, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import AppText from './components/AppText';
import * as SecureStore from 'expo-secure-store';
import { AppRegistry } from 'react-native-web';
import { AuthContext } from './context/AuthContext';

const hero = () => {
  const router = useRouter();
  return (
    // <ApolloProvider client={client}>
    <View className="flex-1 flex justify-end">
      <StatusBar style='light' />
      <Image className="h-full w-full absolute" source={require('../assets/images/login-background.png')} />
      <Animated.View
        entering={FadeIn}
        style={{width: wp(100), height: hp(20)}}
        className="flex justify-start items-center"
      >
        <Image source={require('../assets/images/logo.png')} />
      </Animated.View>
      <LinearGradient
        colors={['transparent, #18181b']}
        style={{width: wp(100), height: hp(70)}}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 0.8}}
        className="flex justify-end pb-12 space-y-8"
      >
        <Animated.View entering={FadeInDown}
          className="flex items-center"
        >
          <TouchableOpacity
            style={{height: hp(6), width: wp(90), borderRadius: '5px'}}
            className="bg-white flex items-center justify-center mx-auto mb-2 drop-shadow border-none"
            onPress={() => router.push('login')}
          >
            <AppText 
              class="text-black font-semibold text-base"
              customStyle={{ fontWeight: '400' }}
              bold={true}
            >
                Log In
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('signup')}
            style={{height: hp(6), width: wp(80), borderRadius: '5px'}}
            className="flex items-center justify-center mx-auto"
          >
            <AppText 
              class='text-white text-base'
            >
                New to Splash? Sign up
            </AppText>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
    // </ApolloProvider>
  )
}

export default hero;

const styles = StyleSheet.create({})