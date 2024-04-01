import { createStackNavigator } from '@react-navigation/stack';
import { animationConfig, standardHeaderStyling } from '../../utils/config';
import Home from '.';
import Notifications from './Notifications';
import { NotificationButton } from '../../components/NotificationButton';
import BackButton from '../../components/BackButton';
import { useMutation } from '@apollo/client';
import { MARK_NOTIFICATIONS_AS_READ } from '../../api/mutations/notifications';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { setUnreadNotifications } from '../../actions/User';

const Stack = createStackNavigator();

export default function StackLayout() {
  const { state, dispatch } = useContext(UserContext);
  const [markNotificationsAsRead, { error }] = useMutation(MARK_NOTIFICATIONS_AS_READ);
  const handleNotificationsRead = async () => {
    try {
      const { data } = await markNotificationsAsRead({
          variables: { unreadNotifications: state.unreadNotifications }
      })
      if(data) {
        dispatch(setUnreadNotifications([]));
      }
    } catch (e) {
        console.log(e);
    }
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