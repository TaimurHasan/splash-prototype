import React, { createContext } from "react";
import { AuthProvider } from "./AuthContext";
import { ActiveProvider } from "./ActiveContext";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    return (
        <AppContext.Provider value={{}}>
            <AuthProvider>
                <ActiveProvider>
                    {children}
                </ActiveProvider>
            </AuthProvider>
        </AppContext.Provider>
    )
};
