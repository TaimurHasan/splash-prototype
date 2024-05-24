import React, { createContext } from "react";
import { sessionReducer } from "../reducers/SessionReducer";

const intitialState = {
    playersToAdd: [],
    timeElapsed: 0,
    activePlayerStats: [],
}

export const SessionContext = createContext({
    dispatch: () => {},
    state: intitialState
});

export const SessionProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(sessionReducer, intitialState);

    const value = { state, dispatch }
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
};