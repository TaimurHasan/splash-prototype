import { makeActionCreator } from "../User";

export const ADD_PLAYER_TO_LIST = 'ADD_PLAYER_TO_LIST';
export const SET_PLAYERS_TO_ADD = 'SET_PLAYERS_TO_ADD';
export const SET_TIME_ELAPSED = 'SET_TIME_ELAPSED';
export const SET_ACTIVE_PLAYER_STATS = 'SET_ACTIVE_PLAYER_STATS';

export const addPlayerToList = makeActionCreator(ADD_PLAYER_TO_LIST);
export const setPlayersToAdd = makeActionCreator(SET_PLAYERS_TO_ADD);
export const setTimeElapsed = makeActionCreator(SET_TIME_ELAPSED);
export const setActivePlayerStats = makeActionCreator(SET_ACTIVE_PLAYER_STATS);