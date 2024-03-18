import { Redirect, Stack, Tabs } from 'expo-router';
import { Screen, ActivityIndicator, Text, View } from 'react-native';

export default function StackLayout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
    </Stack>
  )
}