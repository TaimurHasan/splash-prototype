import { createStackNavigator } from '@react-navigation/stack';
import { animationConfig, standardHeaderStyling } from '../../utils/config';
import Home from '.';
import Notifications from './Notifications';
import { NotificationButton } from '../../components/NotificationButton';
import BackButton from '../../components/BackButton';

const Stack = createStackNavigator();

export default function StackLayout() {
  const handleNotificationsRead = () => {
    // TODO: add functionality to change isRead status for notifications
  }

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
            headerLeft: () => <BackButton backFunction={() => handleNotificationsRead()}/>
          }}
        />
    </Stack.Navigator>
  )
}