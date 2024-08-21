import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppText from '../../../components/AppText'
import { StatusBar } from 'expo-status-bar'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { brandingColors } from '../../../utils/config'
import activeSessionTestData from '../../../../assets/activeSessionTestData'
import { calcDifferenceInSeconds, calcTimePlayed, convertSecondsToHMS } from '../../../utils/helper'
import PlayerCard from './PlayerCard'
import { SessionContext } from '../../../context/SessionContext'
import { setActivePlayerStats, setTimeElapsed } from '../../../actions/Session'
import { useLazyQuery } from '@apollo/client'
import { QUERY_ACTIVE_SESSION } from '../../../api/queries/activeSession'
import { UserContext } from '../../../context/UserContext'


const ActiveSession = () => {
  const { startedAt, playerStats } = activeSessionTestData.data.activeSession;
  const { state: userState } = useContext(UserContext);
  const { state, dispatch } = useContext(SessionContext);
  const [loadActiveSession, { data, loading }] = useLazyQuery(QUERY_ACTIVE_SESSION, {
    variables: { id: userState.activeSessionId },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    intervalId = setInterval(() => dispatch(setTimeElapsed(state.timeElapsed + 1)), 1000);
    return () => clearInterval(intervalId);
  }, [state.timeElapsed])

  const onRefreshSession = () => {
    loadActiveSession();
  };

  useEffect(() => {
    loadActiveSession();
  }, []);

  useEffect(() => {
      if(state.activeSessionId) {
          loadActiveSession();
      }
  }, [state]);

  useEffect(() => {
      console.log(data);
      if(data && !loading) {
          const activeSession = data?.activeSession;
          console.log(data);
          dispatch(setTimeElapsed(calcDifferenceInSeconds(activeSession?.startedAt) || 0));
          dispatch(setActivePlayerStats(activeSession?.playerStats));
      }
  }, [data, loading]);

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
              onRefresh={() => onRefreshSession()} 
          />
        }
      >
        <View className='flex justify-center items-center pt-16 pb-10'>
          <AppText 
            class='text-white'
            customStyle={{fontSize: 44}}
            bold={true}
          >
            {convertSecondsToHMS(state?.timeElapsed)}
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
          {state?.activePlayerStats?.map(stats => (
            <PlayerCard key={stats.user._id} stats={stats} />
          ))}
        </View>
      </ScrollView>
    </>
  )
}

export default ActiveSession

const styles = StyleSheet.create({})