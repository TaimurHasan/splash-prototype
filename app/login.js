import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppText from './components/AppText'
import CustomTextInput from './components/CustomTextInput'
import { emailValidator, pwValidator, validateAll } from './utils/validators'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from './utils/mutations';
import { AuthContext } from './context/AuthContext'
import * as Progress from 'react-native-progress';
import Header from './components/Header'

const login = () => {
    const router = useRouter();
    const { login } = useContext(AuthContext);
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [formStateError, setFormStateError] = useState(false);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
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
        setIsLoginLoading(true);
        try {
            const { data } = await loginUser({
              variables: { ...formState }
            });
            if(data) {
                router.replace('/');
                login(data.login.token);
            }
        } catch (e) {
            console.error(e);
        }
        setIsLoginLoading(false);
    }

    return (
        <>
        <StatusBar translucent={false} barStyle="dark-content" backgroundColor={'white'} style='light' />
        <Header headerText='Login' />
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
                    {isLoginLoading ?
                        <Progress.CircleSnail size={30} color={'black'} /> :
                        <AppText 
                            class="text-black font-semibold text-base"
                            customStyle={{ fontWeight: '400' }}
                            bold={true}
                        >
                            Login
                        </AppText>
                    }
                </TouchableOpacity>
                {error &&
                    <AppText 
                        customStyle={{
                            color: 'white',
                            marginHorizontal: 12,
                            marginTop: 12,
                        }}
                    >
                        Incorrect username or password, please review your details and try again.
                    </AppText>
                }
            </ScrollView>
        </View>
        </>
    )
}

export default login

const styles = StyleSheet.create({})