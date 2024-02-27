import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackButton from '../assets/icons/back.svg';
import AppText from './components/AppText'
import CustomTextInput from './components/CustomTextInput'
import { emailValidator, pwValidator } from './utils/validators'
import { useMutation } from '@apollo/client';
import { ADD_USER } from './utils/mutations';
import Auth from './utils/auth';

const signup = () => {
    const router = useRouter();
    const [formState, setFormState] = useState({ email: '', password: '', username: ''});
    // const [formStateError, setFormStateError] = useState(false);
    const [addUser, { error }] = useMutation(ADD_USER);

    const handleForm = (name, value) => {
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    const submitAddUser = async () => {
        console.log(formState);
        try {
            // execute addUser mutation and pass in variable data from form
            const { data } = await addUser({
              variables: { ...formState }
            });
            
            Auth.login(data.addUser.token);
          } catch (e) {
            console.error(e);
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-black flex" edges={['top']}>
            <StatusBar translucent backgroundColor={'white'} style='light' />

            <View 
                className="h-10 flex-row justify-between items-center bg-splash-gray"
                style={{width: wp(100), height: hp(6)}}
            >
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="pl-7 absolute"
                    style={{zIndex: 1}}
                >
                    <View>
                        <BackButton width={20} height={20} />
                    </View>
                </TouchableOpacity>
                <View
                    style={{width: wp(100)}}
                    className="flex justify-center items-center"
                >
                    <AppText 
                        class="color-[#87E4B7] text-base"
                    >
                        Sign Up
                    </AppText>
                </View>
            </View>

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
                    className="bg-splash-button-green flex items-center justify-center mx-auto mb-2 drop-shadow border-none"
                    onPress={submitAddUser}
                >
                    <AppText 
                    class="text-black font-semibold text-base"
                    customStyle={{ fontWeight: '400' }}
                    bold={true}
                    >
                        Continue
                    </AppText>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default signup

const styles = StyleSheet.create({})