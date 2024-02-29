import React, { useContext } from 'react'
import { Redirect, SplashScreen } from 'expo-router';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { View, Text, ActivityIndicator } from 'react-native';

const index = () => {
  const { userToken, isLoading } = useContext(AuthContext);
  if(isLoading) {
    return (
      <View 
        className='h-full bg-black flex justify-center items-center'
        style={{ alignItems: 'center' }}
      >
        <ActivityIndicator size={'large'} />
      </View>
    )
  }
  console.log(userToken);
  return (
      !isLoading &&
        <Redirect href={userToken ? '/home' : '/hero'} />
  )
}

export default index;