import { ADD_PLAYER_TO_LIST, SET_ACTIVE_PLAYER_STATS, SET_PLAYERS_TO_ADD, SET_TIME_ELAPSED } from "../actions/Session/index.js";

export const sessionReducer = (state, action) => {
    switch (action.type) {
        case ADD_PLAYER_TO_LIST: {
            return {
                ...state,
                playersToAdd: [
                    ...state.playersToAdd,
                    action.payload,
                ],
            };
        }
        case SET_PLAYERS_TO_ADD: {
            return {
                ...state,
                playersToAdd: action.payload,
            };
        }
        case SET_TIME_ELAPSED: {
            return {
                ...state,
                timeElapsed: action.payload,
            };
        }
        case SET_ACTIVE_PLAYER_STATS: {
            return {
                ...state,
                activePlayerStats: action.payload,
            }
        }
    }
};