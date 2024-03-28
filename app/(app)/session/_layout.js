import { createStackNavigator } from '@react-navigation/stack';
import Session from '.';
import { animationConfig } from '../../utils/config';
import { standardHeaderStyling } from '../../utils/config';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import BackButton from '../../components/BackButton';
import { useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';
import { setPlayersToAdd } from '../../actions/Session';
import Start from './Start';

const Stack = createStackNavigator();

export default function StackLayout() {
  const { dispatch } = useContext(SessionContext); 
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
            title: "Add Players",
            gestureDirection: 'vertical',
            transitionSpec: { 
              open: animationConfig,
              close: animationConfig,
            
            },
            ...standardHeaderStyling,
            headerLeft: () => <BackButton backFunction={() => dispatch(setPlayersToAdd([]))} />
          }}
        />
    </Stack.Navigator>
  )
};