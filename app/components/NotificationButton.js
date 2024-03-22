import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { brandingColors } from '../utils/config';

export const NotificationButton = () => {
    const router = useRouter();
    return (
        <TouchableOpacity
            onPress={() => router.push('/home/Notifications')}
            className="pr-6 absolute"
            style={{zIndex: 1}}
        >
            <View>
                <Ionicons name="notifications-sharp" size={24} color={brandingColors.splashGreen} />
            </View>
        </TouchableOpacity>
    )
}

export default NotificationButton;

const styles = StyleSheet.create({})