import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Redirect, useRouter } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackButton from '../../assets/icons/back.svg';
import AppText from '../components/AppText'
import CustomTextInput from '../components/CustomTextInput'
import { emailValidator, pwValidator, validateAll } from '../utils/validators'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { AuthContext } from '../context/AuthContext'

const login = () => {
    const router = useRouter();
    const { login } = useContext(AuthContext);
    const insets = useSafeAreaInsets();
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [formStateError, setFormStateError] = useState(false);
    const [loginUser, { error }] = useMutation(LOGIN_USER);

    useEffect(() => {
        if(!validateAll(formState)) {
            setFormStateError(true);
        } else {
            setFormStateError(false);
        }
    }, [formState]);

    const handleForm = (name, value) => {
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    const submitLoginUser = async () => {
        login(formState);
        router.push('/');
    }

    return (
        <>
        <StatusBar translucent={false} barStyle="dark-content" backgroundColor={'white'} style='light' />
        <View 
            className="flex-row justify-between items-end bg-splash-gray pb-0"
            style={{width: wp(100), height: insets.top + hp(5)}}
        >
            <TouchableOpacity
                onPress={() => router.back()}
                className="pl-6 absolute pb-3"
                style={{zIndex: 1}}
            >
                <View>
                    <BackButton width={20} height={20} />
                </View>
            </TouchableOpacity>
            <View
                style={{width: wp(100)}}
                className="flex justify-center items-center mb-3"
            >
                <AppText 
                    class="color-[#87E4B7] text-base"
                >
                    Login
                </AppText>
            </View>
        </View>
        <View className="flex-1 bg-black flex p-0">

            <ScrollView>
                <CustomTextInput 
                    label={'Email'}
                    value={formState?.email}
                    error={false}
                    labelStyle={{color: 'white'}}
                    customStyle={{
                        marginHorizontal: 12,
                        marginTop: 24,
                    }}
                    setValue={(value) => handleForm('email', value)}
                    placeholder={'example@gmail.com'}
                    secureTextEntry={false}
                    validator={emailValidator}
                />
                <CustomTextInput 
                    label={'Password'}
                    value={formState?.password}
                    error={false}
                    labelStyle={{color: 'white'}}
                    customStyle={{
                        marginHorizontal: 12,
                        marginTop: 24,
                    }}
                    setValue={(value) => handleForm('password', value)}
                    placeholder={'minimum 6 characters'}
                    secureTextEntry={true}
                    validator={pwValidator}
                />
                <TouchableOpacity
                    style={{height: hp(6), width: wp(94), borderRadius: '5px', marginTop: 32 }}
                    className={`${formStateError ? 'bg-splash-gray' : 'bg-splash-greenbtn'} flex items-center justify-center mx-auto mb-2 drop-shadow border-none`}
                    onPress={submitLoginUser}
                    disabled={formStateError}
                >
                    <AppText 
                    class="text-black font-semibold text-base"
                    customStyle={{ fontWeight: '400' }}
                    bold={true}
                    >
                        Login
                    </AppText>
                </TouchableOpacity>
                {error &&
                    <AppText 
                        customStyle={{
                            color: 'white',
                            marginHorizontal: 12,
                            marginTop: 12,
                        }}
                    >
                        There was an error signing you up, please review your details and try again.
                    </AppText>
                }
            </ScrollView>
        </View>
        </>
    )
}

export default login

const styles = StyleSheet.create({})