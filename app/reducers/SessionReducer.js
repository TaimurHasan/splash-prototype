import { SET_IS_ACTIVE } from "../actions/Session/index.js";

export const sessionReducer = (state, action) => {
    switch (action.type) {
        case SET_IS_ACTIVE: {
            return {
                ...state,
                isActive: action.payload,
            };
        }
    }
};