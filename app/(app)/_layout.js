import { Redirect, Stack, Tabs } from 'expo-router';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, Text, View } from 'react-native';
import Loading from '../components/Loading';

export default function AppLayout() {
  const { userToken, isLoading } = useContext(AuthContext);

  if(isLoading) {
    return (
      <View 
        className='h-full bg-black flex justify-center items-center'
        style={{ alignItems: 'center' }}
      >
        <Loading />
      </View>
    )
  }

  if (!userToken) {
    return <Redirect href="/hero" />;
  }

  return (
    <Tabs 
        screenOptions={{ 
            tabBarActiveTintColor: 'white', 
            tabBarStyle: {
                backgroundColor: '#1c1c1e',
                borderTopColor: 'transparent'
        }}}
    >
        <Tabs.Screen 
            name="home" 
            options={{ headerShown: false }}
        />
        <Tabs.Screen 
            name="session" 
            options={{ headerShown: false }}
        />
    </Tabs>
)
}