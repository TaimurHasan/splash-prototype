import { useQuery } from "@apollo/client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { QUERY_ME } from "../utils/queries";
import { AuthContext } from "./AuthContext";

export const ActiveContext = createContext();

export const ActiveProvider = ({ children }) => {
    const { userToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const { loading, data } = useQuery(QUERY_ME);

    const setActive = async (state) => {
        setIsLoading(true);
        setIsActive(state);
        setIsLoading(false);
    };

    const isActiveState = async () => {
        setIsLoading(true);
        try {
            if(data && userToken) {
                setIsActive(data?.me?.isActive === 'true');
            }
        } catch (e) {
            console.log(e);
        };
        setIsLoading(false);
    };

    useEffect(() => {
        isActiveState();
    }, [loading, data]);
    return (
        <ActiveContext.Provider value={{ isLoading, isActive, setActive }}>
            {children}
        </ActiveContext.Provider>
    )
};