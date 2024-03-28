import { useQuery } from "@apollo/client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { QUERY_ME } from "../utils/queries";
import { AuthContext } from "./AuthContext";
import { sessionReducer } from "../reducers/SessionReducer";
import { addPlayerToList } from "../actions/Session";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SessionContext = createContext({
    dispatch: () => {},
    state: {
        playersToAdd: [],
    }
});

export const SessionProvider = ({ children }) => {
    const { state: authState } = useContext(AuthContext);
    const [state, dispatch] = React.useReducer(sessionReducer, {
        playersToAdd: [],
    });

    // const { state: authState } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     if(authState.userId) {
    //         dispatch(addPlayerToList(authState.userId));
    //     }
    // }, [authState]);

    const value = { state, dispatch, isLoading }
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
};