import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppText from '../../../components/AppText'
import { StatusBar } from 'expo-status-bar'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { brandingColors } from '../../../utils/config'
import activeSessionTestData from '../../../../assets/activeSessionTestData'
import { calcDifferenceInSeconds, calcTimePlayed, convertSecondsToHMS } from '../../../utils/helper'
import PlayerCard from './PlayerCard'


const ActiveSession = () => {
  const { startedAt, playerStats } = activeSessionTestData.data.activeSession;
  const [timeElapsed, setTimeElapsed] = useState(calcDifferenceInSeconds(startedAt) || 0);

  useEffect(() => {
    intervalId = setInterval(() => setTimeElapsed(timeElapsed + 1), 1000);
    return () => clearInterval(intervalId);
  }, [timeElapsed])

  return (
    <>
      <StatusBar style='light' />
      <ScrollView
        className='flex-1 mt-0 bg-black'
        style={{height: hp(100), width: wp(100)}}
        refreshControl={
          <RefreshControl 
              style={{marginTop: 0}}
              tintColor={brandingColors.splashGreenbtn}
              refreshing={false} 
              onRefresh={() => console.log('refresh session')} 
          />
        }
      >
        <View className='flex justify-center items-center pt-16 pb-10'>
          <AppText 
            class='text-white'
            customStyle={{fontSize: 44}}
            bold={true}
          >
            {convertSecondsToHMS(timeElapsed)}
          </AppText>
        </View>
        <View className='flex justify-center px-5 mb-4'>
          <AppText 
            class='text-white text-base'
          >
            Points Leaderboard
          </AppText>
        </View>
        <View className='flex justify-center px-5'>
          <AppText 
            class='text-white text-base mb-4'
          >
            Players
          </AppText>
          {playerStats.map(stats => (
            <PlayerCard key={stats.user._id} stats={stats} />
          ))}
        </View>
      </ScrollView>
    </>
  )
}

export default ActiveSession

const styles = StyleSheet.create({})