export const LOG_IN_USER = 'LOG_IN_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_IS_ACTIVE = 'SET_IS_ACTIVE';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_ACTIVE_SESSION_ID = 'SET_ACTIVE_SESSION_ID';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const SET_UNREAD_NOTIFICATIONS = 'SET_UNREAD_NOTIFICATIONS';

export const makeActionCreator =
    (type, data = true) =>
    (payload) => {
        return data ? { type, payload } : { type };
    }

export const logInUser = makeActionCreator(LOG_IN_USER);
export const logoutUser = makeActionCreator(LOG_OUT_USER);
export const setIsLoading = makeActionCreator(SET_IS_LOADING);
export const setIsActive = makeActionCreator(SET_IS_ACTIVE);
export const setUserId = makeActionCreator(SET_USER_ID);
export const setActiveSessionId = makeActionCreator(SET_ACTIVE_SESSION_ID);
export const setNotifications = makeActionCreator(SET_NOTIFICATIONS);
export const setUnreadNotifications = makeActionCreator(SET_UNREAD_NOTIFICATIONS);
