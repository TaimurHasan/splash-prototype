import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { brandingColors } from '../utils/config';
import { AuthContext } from '../context/AuthContext';

export const NotificationButton = () => {
    const router = useRouter();
    const { state } = useContext(AuthContext);
    const [hasUnread, setHasUnread] = useState(false);

    useEffect(() => {
        state?.notifications?.forEach(({ isRead }) => {
            if(!isRead) {
                setHasUnread(true);
            }
        });
    }, [state.notifications]);
    return (
        <>
        <TouchableOpacity
            onPress={() => router.push('/home/Notifications')}
            className="pr-6 absolute"
            style={{zIndex: 1}}
        >
            <View>
                <Ionicons name="notifications-sharp" size={24} color={brandingColors.splashGreen} />
            </View>
        </TouchableOpacity>
        </>
    )
}

export default NotificationButton;

const styles = StyleSheet.create({})