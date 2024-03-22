import { Redirect, Tabs } from 'expo-router';
import { Screen, ActivityIndicator, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { animationConfig, standardHeaderStyling } from '../../utils/config';
import Home from '.';
import Notifications from './Notifications';
import { NotificationButton } from '../../components/NotificationButton';
import BackButton from '../../components/BackButton';

const Stack = createStackNavigator();

export default function StackLayout() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="index" component={Home}
          options={{
            title: "Home",
            // headerShown: false
            ...standardHeaderStyling,
            headerRight: () => <NotificationButton />
          }}
        />
        <Stack.Screen name="Notifications" component={Notifications}
          options={{
            title: "Notifications",
            gestureDirection: 'vertical',
            transitionSpec: { 
              open: animationConfig,
              close: animationConfig,
            
            },
            ...standardHeaderStyling,
            headerLeft: () => <BackButton />
          }}
        />
    </Stack.Navigator>
  )
}