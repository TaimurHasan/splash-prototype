import { makeActionCreator } from "../User";

export const ADD_PLAYER_TO_LIST = 'ADD_PLAYER_TO_LIST';
export const SET_PLAYERS_TO_ADD = 'SET_PLAYERS_TO_ADD';

export const addPlayerToList = makeActionCreator(ADD_PLAYER_TO_LIST);
export const setPlayersToAdd = makeActionCreator(SET_PLAYERS_TO_ADD);