import { useQuery } from "@apollo/client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { QUERY_ME } from "../utils/queries";
import { AuthContext } from "./AuthContext";
import { sessionReducer } from "../reducers/SessionReducer";
import { setIsActive } from "../actions/Session";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SessionContext = createContext({
    dispatch: () => {},
    state: {
        isActive: false,
    }
});

export const SessionProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(sessionReducer, {
        isActive: false,
    });

    const { state: authState } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    const setActive = async (state) => {
        setIsLoading(true);
        console.log(state);
        dispatch(setIsActive(state));
        if(state) {
            await AsyncStorage.setItem('sessionId', 'testId');
        } else {
            await AsyncStorage.removeItem('sessionId');
        }
        setIsLoading(false);
    };

    const isActiveState = async () => {
        setIsLoading(true);
        try {
            if(authState) {
                const sessionId = await AsyncStorage.getItem('sessionId');
                dispatch(setIsActive(!!sessionId));
            };
        } catch (e) {
            console.log(e);
        };
        setIsLoading(false);
    };

    useEffect(() => {
        isActiveState();
    }, []);

    // useEffect(() => {
    //     setIsLoading(loading);
    // }, [loading])

    const value = { state, dispatch, setActive, isLoading }
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
};