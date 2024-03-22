import { createStackNavigator } from '@react-navigation/stack';
import Session from '.';
import Start from './Start';
import { animationConfig } from '../../utils/config';
import { standardHeaderStyling } from '../../utils/config';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import BackButton from '../../components/BackButton';

const Stack = createStackNavigator();

export default function StackLayout() {
  const router = useRouter();
  return (
    <Stack.Navigator>
        <Stack.Screen name="index" component={Session}
          options={{
            title: "Session",
            // headerShown: false
            ...standardHeaderStyling
          }}
        />
        <Stack.Screen name="Start" component={Start}
          options={{
            title: "Start Session",
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