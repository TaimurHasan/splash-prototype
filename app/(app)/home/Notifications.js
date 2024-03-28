import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const Notifications = () => {
  return (
    <View className='bg-black' style={{ height: hp(100)}}>
      <Text>Notification</Text>
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({})