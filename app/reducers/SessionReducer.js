import { ADD_PLAYER_TO_LIST, SET_PLAYERS_TO_ADD } from "../actions/Session/index.js";

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
    }
};