import { Redirect, Tabs } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View } from 'react-native';
import Loading from '../components/Loading';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { brandingColors } from '../utils/config';

export default function AppLayout() {
  const { state } = useContext(AuthContext);
  if(state?.isLoading) {
    return (
      <View 
        className='h-full bg-black flex justify-center items-center'
        style={{ alignItems: 'center' }}
      >
        <Loading />
      </View>
    )
  }

  if (!state.userToken) {
    return <Redirect href="/hero" />;
  }

  return (
    <Tabs 
        screenOptions={{ 
            tabBarActiveTintColor: 'white', 
            tabBarStyle: {
              backgroundColor: '#1c1c1e',
              borderTopColor: 'transparent',
            },
            tabBarLabelStyle: {
              marginBottom: hp(0.5)
            },
            tabBarIconStyle: {
              marginVertical: hp(0.5)
            }
        }}
    >
        <Tabs.Screen 
            name="home" 
            options={{ 
              title: 'Home',
              headerShown: false,
              tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="home-variant-outline" size={24} color={focused ? brandingColors.splashGreen : 'white'} />
            }}
        />
        <Tabs.Screen 
            name="session"
            options={{ 
              title: 'Session',
              headerShown: false,
              tabBarIcon: ({ focused }) => <Ionicons name="basketball-outline" size={24} color={focused ? brandingColors.splashGreen : 'white'} />
            }}
        />
    </Tabs>
)
}