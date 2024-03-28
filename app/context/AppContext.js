import React, { createContext } from "react";
import { UserProvider } from "./UserContext";
import { SessionProvider } from "./SessionContext";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    return (
        <AppContext.Provider value={{}}>
            <UserProvider>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </UserProvider>
        </AppContext.Provider>
    )
};
