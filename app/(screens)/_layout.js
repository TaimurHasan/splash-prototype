import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    

    return (
        <Stack screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="hero" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="login" />
        </Stack>
    )
}

export default _layout

const styles = StyleSheet.create({})