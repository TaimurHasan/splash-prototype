import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from 'expo-router'

const _layout = () => {
    session = false;

    if(session) {
        return <Redirect href='/hero' />
    }

    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ headerShown: false }}/>
        </Tabs>
    )
}

export default _layout

const styles = StyleSheet.create({})