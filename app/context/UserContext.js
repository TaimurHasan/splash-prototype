import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { userReducer } from "../reducers/UserReducer.js";
import { logInUser, logoutUser, setActiveSessionId, setIsActive, setIsLoading, setUserId } from "../actions/User/index.js";
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_ME } from "../api/queries/user.js";

export const UserContext = createContext({
    dispatch: () => {},
    state: {
        userToken: '',
        isLoading: false,
        isActive: false,
        activeSessionId: '',
        userId: '',
        notifications: [],
        unreadNotifications: [],
    }
});

export const UserProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(userReducer, {
        userToken: '',
        isLoading: false,
        isActive: false,
        activeSessionId: '',
        userId: '',
        notifications: [],
        unreadNotifications: [],
    });

    const [loadAuth, { client, data, loading }] = useLazyQuery(QUERY_ME, {
        fetchPolicy: 'cache-and-network',
    });

    const login = async (token) => {
        dispatch(setIsLoading(true));
        dispatch(logInUser(token));
        await AsyncStorage.setItem('userToken', token);
        loadAuth();
        setTimeout(() => dispatch(setIsLoading(false)), 1000);
    }

    const logout = () => {
        dispatch(setIsLoading(true));
        dispatch(logoutUser());
        AsyncStorage.removeItem('userToken');
        client.resetStore();
        dispatch(setIsLoading(false));
    }

    const isLoggedIn = async () => {
        try {    
            dispatch(setIsLoading(true));
            let userToken = await AsyncStorage.getItem('userToken');
            if(userToken) {
                dispatch(logInUser(userToken));
                loadAuth();
            }
            dispatch(setIsLoading(false));
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    useEffect(() => {
        if(!loading && data) {
            dispatch(setIsActive(data?.me?.isActive === 'true'));
            dispatch(setUserId(data?.me?._id));
            if(data?.me?.activeSessionId) {
                dispatch(setActiveSessionId(data?.me?.activeSessionId));
            }
        }
    }, [data, loading]);

    const value = { state, dispatch, login, logout };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};