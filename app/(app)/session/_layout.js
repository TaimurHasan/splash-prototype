import { Redirect, Slot, Tabs } from 'expo-router';
import { Screen, ActivityIndicator, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Session from '.';
import Start from './Start';
import { animationConfig } from '../../utils/constants';

const Stack = createStackNavigator();

export default function StackLayout() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="index" component={Session}
          options={{
            headerShown: false 
          }}
        />
        <Stack.Screen name="Start" component={Start}
          options={{
            gestureDirection: 'vertical',
            transitionSpec: { 
              open: animationConfig,
              close: animationConfig,
            
            },
            headerShown: false 
          }}
        />
    </Stack.Navigator>
  )
}