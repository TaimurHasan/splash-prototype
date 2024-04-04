import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import { UserContext } from '../../../context/UserContext'
import { brandingColors } from '../../../utils/config'
import NotificationItem from './NotificationItem'
import { useLazyQuery } from '@apollo/client'
import { QUERY_MY_NOTIFICATIONS } from '../../../api/queries/notification'
import { setNotifications, setUnreadNotifications } from '../../../actions/User'

const Notifications = () => {
  const { state, dispatch } = useContext(UserContext);
  const [loadNotifications, { data, loading }] = useLazyQuery(QUERY_MY_NOTIFICATIONS, {
    fetchPolicy: 'cache-and-network',
  });

  const onRefresh = () => {
    loadNotifications();
  };

  useEffect(() => {
    dispatch(setNotifications(data?.myNotifications));
  }, [data, loading]);

  return (
    <>
      <StatusBar style='light' />
      <ScrollView
        className='flex-1 mt-0 bg-black'
        style={{height: hp(100)}}
        refreshControl={
          <RefreshControl 
              style={{marginTop: 0}}
              tintColor={brandingColors.splashGreenbtn}
              refreshing={false} 
              onRefresh={onRefresh} 
          />
        }
      >
        {state?.notifications?.map(notifDetails => (
          <NotificationItem notifDetails={notifDetails} />
        ))}
      </ScrollView>
    </>
  )
}

export default Notifications

const styles = StyleSheet.create({})