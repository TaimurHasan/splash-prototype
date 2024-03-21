import { createStackNavigator } from '@react-navigation/stack';
import Session from '.';
import Start from './Start';
import { animationConfig } from '../../utils/config';
import Loading from '../../components/Loading';
import { useContext, useEffect } from 'react';
import { SessionContext } from '../../context/SessionContext';
import { setIsActive } from '../../actions/Session';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { View } from 'react-native';

const Stack = createStackNavigator();

export default function StackLayout() {
  const query = useQuery(QUERY_ME);
  const { setActive } = useContext(SessionContext);

  if(query.loading) {
    return (
      <View 
        className='h-full bg-black flex justify-center items-center'
        style={{ alignItems: 'center' }}
      >
        <Loading />
      </View>
    )
  };

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