import { makeActionCreator } from "../Auth";

export const SET_IS_ACTIVE = 'SET_IS_ACTIVE';

export const setIsActive = makeActionCreator(SET_IS_ACTIVE);