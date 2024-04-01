import { LOG_IN_USER, LOG_OUT_USER, SET_ACTIVE_SESSION_ID, SET_IS_ACTIVE, SET_IS_LOADING, SET_NOTIFICATIONS, SET_UNREAD_NOTIFICATIONS, SET_USER_ID, } from "../actions/User/index.js";

export const userReducer = (state, action) => {
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
        case SET_ACTIVE_SESSION_ID: {
            return {
                ...state,
                activeSessionId: action.payload,
            };
        }
        case SET_NOTIFICATIONS: {
            return {
                ...state,
                notifications: action.payload,
            }
        }
        case SET_UNREAD_NOTIFICATIONS: {
            return {
                ...state,
                unreadNotifications: action.payload,
            }
        }
    }
};