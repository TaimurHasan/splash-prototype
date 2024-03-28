import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackButton from '../assets/icons/back.svg';
import AppText from './components/AppText'
import CustomTextInput from './components/CustomTextInput'
import { emailValidator, pwValidator, validateAll } from './utils/validators'
import { useMutation } from '@apollo/client';
import { UserContext } from './context/UserContext'
import Header from './components/Header'
import { ADD_USER } from './api/mutations/user'

const signup = () => {
    const router = useRouter();
    const { login } = useContext(UserContext);
    const insets = useSafeAreaInsets();
    const [formState, setFormState] = useState({ email: '', password: '', username: ''});
    const [formStateError, setFormStateError] = useState(false);
    const [addUser, { error }] = useMutation(ADD_USER);

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

    const submitAddUser = async () => {
        try {
            // execute addUser mutation and pass in variable data from form
            const { data } = await addUser({
              variables: { ...formState }
            });
            router.replace('/');
            login(data.addUser.token);
          } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
        <StatusBar translucent={false} barStyle="dark-content" backgroundColor={'white'} style='light' />
        <Header headerText='Sign up' />
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
                <CustomTextInput 
                    label={'Username'}
                    value={formState?.username}
                    error={false}
                    labelStyle={{color: 'white'}}
                    customStyle={{
                        marginHorizontal: 12,
                        marginTop: 24,
                    }}
                    setValue={(value) => handleForm('username', value)}
                    placeholder={'username'}
                    secureTextEntry={false}
                />
                <TouchableOpacity
                    style={{height: hp(6), width: wp(94), borderRadius: '5px', marginTop: 32 }}
                    className={`${formStateError ? 'bg-splash-gray' : 'bg-splash-greenbtn'} flex items-center justify-center mx-auto mb-2 drop-shadow border-none`}
                    onPress={submitAddUser}
                    disabled={formStateError}
                >
                    <AppText 
                    class="text-black font-semibold text-base"
                    customStyle={{ fontWeight: '400' }}
                    bold={true}
                    >
                        Continue
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

export default signup

const styles = StyleSheet.create({})