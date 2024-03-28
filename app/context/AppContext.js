import React, { createContext } from "react";
import { AuthProvider } from "./AuthContext";
import { SessionProvider } from "./SessionContext";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    return (
        <AppContext.Provider value={{}}>
            <AuthProvider>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </AuthProvider>
        </AppContext.Provider>
    )
};
