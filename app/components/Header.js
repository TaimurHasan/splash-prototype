import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackButton from '../../assets/icons/back.svg';
import AppText from '../components/AppText'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = (props) => {
    const {
        headerText,
        showBack = true,
        backRoute,
    } = props;
    const insets = useSafeAreaInsets();
    const router = useRouter();
    return (
        <View 
            className="flex-row justify-between items-end bg-splash-gray pb-0"
            style={{width: wp(100), height: insets.top + hp(5)}}
        >
            {showBack &&
                <TouchableOpacity
                    onPress={() => backRoute ? router.push(backRoute) : router.back()}
                    className="pl-6 absolute pb-3"
                    style={{zIndex: 1}}
                >
                    <View>
                        <BackButton width={20} height={20} />
                    </View>
                </TouchableOpacity>
            }
            <View
                style={{width: wp(100)}}
                className="flex justify-center items-center mb-3"
            >
                <AppText 
                    class="color-[#87E4B7] text-base"
                    bold={true}
                >
                    {headerText}
                </AppText>
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({})