import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { brandingColors } from '../utils/config';
import { UserContext } from '../context/UserContext';
import { Entypo } from '@expo/vector-icons';

export const NotificationButton = () => {
    const router = useRouter();
    const { state } = useContext(UserContext);
    const [hasUnread, setHasUnread] = useState(false);

    return (
        <>
        <TouchableOpacity
            onPress={() => router.push('/home/Notifications')}
            className="pr-6 absolute"
            style={{zIndex: 1}}
        >
            {state?.unreadNotifications?.length > 0 && 
                <View style={styles.unreadDot}>
                    <Entypo name="dot-single" size={40} color={brandingColors.splashRedbtn} />
                </View>
            }
            <View>
                <Ionicons name="notifications-sharp" size={24} color={brandingColors.splashGreen} />
            </View>
        </TouchableOpacity>
        </>
    )
}

export default NotificationButton;

const styles = StyleSheet.create({
    unreadDot: {
        position: 'absolute',
        top: -15,
        zIndex: 1,
    }
})