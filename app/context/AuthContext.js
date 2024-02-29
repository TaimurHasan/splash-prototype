import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [addUser, { error }] = useMutation(ADD_USER);
    const [loginUser, { error: loginErr }] = useMutation(LOGIN_USER);

    const signup = async (formState) => {
        setIsLoading(true);
        try {
            // execute addUser mutation and pass in variable data from form
            const { data } = await addUser({
              variables: { ...formState }
            });
            AsyncStorage.setItem('userToken', data.addUser.token);
          } catch (e) {
            console.error(e);
        }
        setIsLoading(false);
    }

    const login = async (formState) => {
        setIsLoading(true);
        try {
            // execute addUser mutation and pass in variable data from form
            const { data } = await loginUser({
              variables: { ...formState }
            });
            setUserToken(data.login.token);
            AsyncStorage.setItem('userToken', data.login.token);
          } catch (e) {
            console.error(e);
        }
        setIsLoading(false);
    }
    const test = 'ok';
    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {    
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            setIsLoading(false);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{test, login, logout, isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    )
};