import { IReduxAction } from '../../../state/interfaces';

import { Rolls } from './interfaces';

export enum ActionTypes {
  ROLL_DIE = 'die/ROLL_DIE',
  ROLL_DIE_COMPLETE = 'die/ROLL_DIE_COMPLETE',
  ENABLE_DIE = 'die/ENABLE_DIE',
  DISABLE_DIE = 'die/DISABLE_DIE',
  INVALIDATE_DIE_ROLL = 'die/INVALIDATE_DIE_ROLL',
  LOADER = 'die/LOADER',
  SET_LOADER_STATE = 'die/SET_LOADER_STATE',
  REMAINIING_PATH_COLOR = 'die/REMAINIING_PATH_COLOR',
  LOADER_CLEAR = 'die/LOADER_CLEAR',
  SET_TIME_PASSED = 'die/SET_TIME_PASSED',
  SET_TIME_LIMIT_FOR_SERVER = 'die/SET_TIME_LIMIT_FOR_SERVER',
}

export const rollDie = (value: string): IReduxAction<ActionTypes.ROLL_DIE, { value: string }> => ({
  type: ActionTypes.ROLL_DIE,
  data: { value },
});

export const rollDieComplete = (value: Rolls): IReduxAction<ActionTypes.ROLL_DIE_COMPLETE, { value: Rolls }> => ({
  data: { value },
  type: ActionTypes.ROLL_DIE_COMPLETE,
});

export const enableDie = (timeLeft = 30): IReduxAction<ActionTypes.ENABLE_DIE, { timeLeft: number }> => ({
  type: ActionTypes.ENABLE_DIE,
  data: { timeLeft }
});

export const disableDie = (): IReduxAction<ActionTypes.DISABLE_DIE, void> => ({
  type: ActionTypes.DISABLE_DIE,
});

export const invalidateDieRoll = (): IReduxAction<ActionTypes.INVALIDATE_DIE_ROLL, void> => ({
  type: ActionTypes.INVALIDATE_DIE_ROLL,
});

export const loader = (currentTurn: string, coin: boolean): IReduxAction<ActionTypes.LOADER, { currentTurn: string, coin: boolean }> => ({
  type: ActionTypes.LOADER,
  data: { currentTurn, coin },
});

export const setLoaderState = (): IReduxAction<ActionTypes.SET_LOADER_STATE, void> => ({
  type: ActionTypes.SET_LOADER_STATE,
});

export const setRemainingPathColor = (timeLeft: number): IReduxAction<ActionTypes.REMAINIING_PATH_COLOR, { timeLeft: number }> => ({
  type: ActionTypes.REMAINIING_PATH_COLOR,
  data: { timeLeft },
});

export const loaderClear = (): IReduxAction<ActionTypes.LOADER_CLEAR, void> => ({
  type: ActionTypes.LOADER_CLEAR,
});

export const setTimePassed = (timePassed: number, timeLeft: number): IReduxAction<ActionTypes.SET_TIME_PASSED, { timePassed: number, timeLeft: number }> => ({
  type: ActionTypes.SET_TIME_PASSED,
  data: { timePassed, timeLeft },
});
export const setTimeLimitForServer = (): IReduxAction<ActionTypes.SET_TIME_LIMIT_FOR_SERVER, void> => ({
  type: ActionTypes.SET_TIME_LIMIT_FOR_SERVER,
});

export type Actions =
  | ReturnType<typeof rollDie>
  | ReturnType<typeof rollDieComplete>
  | ReturnType<typeof enableDie>
  | ReturnType<typeof disableDie>
  | ReturnType<typeof invalidateDieRoll>
  | ReturnType<typeof loader>
  | ReturnType<typeof setLoaderState>
  | ReturnType<typeof setRemainingPathColor>
  | ReturnType<typeof loaderClear>
  | ReturnType<typeof setTimePassed>
  | ReturnType<typeof setTimeLimitForServer>
  ;
