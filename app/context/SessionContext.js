import React, { createContext } from "react";
import { sessionReducer } from "../reducers/SessionReducer";

export const SessionContext = createContext({
    dispatch: () => {},
    state: {
        playersToAdd: [],
    }
});

export const SessionProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(sessionReducer, {
        playersToAdd: [],
    });

    const value = { state, dispatch }
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
};