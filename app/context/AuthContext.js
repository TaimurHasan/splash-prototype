import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { authReducer } from "../reducers/AuthReducer.js";
import { logInUser, logoutUser, setIsLoading } from "../actions/Auth/index.js";

export const AuthContext = createContext({
    dispatch: () => {},
    state: {
        userToken: '',
        isLoading: false,
    }
});

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(authReducer, {
        userToken: '',
        isLoading: false,
    });

    const login = async (token) => {
        dispatch(setIsLoading(true));
        dispatch(logInUser(token));
        await AsyncStorage.setItem('userToken', token);
        setTimeout(() => dispatch(setIsLoading(false)), 1000);
    }

    const logout = () => {
        dispatch(setIsLoading(true));
        dispatch(logoutUser());
        AsyncStorage.removeItem('userToken');
        dispatch(setIsLoading(false));
    }

    const isLoggedIn = async () => {
        try {    
            dispatch(setIsLoading(true));
            let userToken = await AsyncStorage.getItem('userToken');
            dispatch(logInUser(userToken));
            dispatch(setIsLoading(false));
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    const value = { state, dispatch, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};