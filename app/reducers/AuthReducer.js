import { LOG_IN_USER, LOG_OUT_USER, SET_IS_ACTIVE, SET_IS_LOADING, SET_USER_ID, } from "../actions/Auth/index.js";

export const authReducer = (state, action) => {
    switch (action.type) {
        case LOG_IN_USER: {
            return {
                ...state,
                userToken: action.payload,
            };
        }
        case LOG_OUT_USER: {
            return {
                ...state,
                userToken: null,
            };
        }
        case SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.payload,
            };
        }
        case SET_IS_ACTIVE: {
            return {
                ...state,
                isActive: action.payload,
            };
        }
        case SET_USER_ID: {
            return {
                ...state,
                userId: action.payload,
            };
        }
    }
};