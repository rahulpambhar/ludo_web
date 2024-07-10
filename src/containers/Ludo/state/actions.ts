import { Rolls } from '../../../containers/Dice/state/interfaces';
import { IReduxAction, WalkwayPosition } from '../../../state/interfaces';

import { IBase, ICell, ICoin, IState, IWalkway, BaseID, } from './interfaces';

export enum ActionTypes {
  GET_INITIAL_GAME_DATA = 'ludo/GET_INITIAL_GAME_DATA',
  GET_REFRESH_GAME_DATA = 'ludo/GET_REFRESH_GAME_DATA',
  GET_INITIAL_GAME_DATA_SUCCESS = 'ludo/GET_INITIAL_GAME_DATA_SUCCESS',

  SPAWN_COIN = 'ludo/SPAWN_COIN',
  SPAWN_COIN_SUCCESS = 'ludo/SPAWN_COIN_SUCCESS',
  MOVE_COIN = 'ludo/MOVE_COIN',
  MOVE_COIN_SUCCESS = 'ludo/MOVE_COIN_SUCCESS',
  MOVE_COIN_FAILURE = 'ludo/MOVE_COIN_FAILURE',
  LIFT_COIN = 'ludo/LIFT_COIN',
  PLACE_COIN = 'ludo/PLACE_COIN',
  DISQUALIFY_COIN = 'ludo/DISQUALIFY_COIN',
  HOME_COIN = 'ludo/HOME_COIN',
  UPDATE_LIFE = 'ludo/UPDATE_LIFE',

  NEXT_TURN = 'ludo/NEXT_TURN',
  PASS_TURN_TO = 'ludo/PASS_TURN_TO',

  MARK_CURRENT_BASE = 'ludo/MARK_CURRENT_BASE',
  MARK_WINNER = 'ludo/MARK_WINNER',

  SET_PLAYERS = 'ludo/SET_PLAYERS',
  UPDATE_BASE = 'ludo/UPDATE_BASE',
  ENABLE_BASE = 'ludo/ENABLE_BASE',
  DISABLE_BASE = 'ludo/DISABLE_BASE',
  LEAVE_ROOM = 'ludo/LEAVE_ROOM',
  WIN_TIME_DISABLE_BASE = 'ludo/WIN_TIME_DISABLE_BASE',

  GET_ADDRESS = 'ludo/GET_ADDRESS',
  SET_WINNER = 'ludo/SET_WINNER',
  SIX_DIE_ROLL_THREE_TIME = 'ludo/SIX_DIE_ROLL_THREE_TIME'

}

export const getInitialGameData = (): IReduxAction<ActionTypes.GET_INITIAL_GAME_DATA, void> => ({
  type: ActionTypes.GET_INITIAL_GAME_DATA,
});


export const getInitialGameDataSuccess = (gameData: IState): IReduxAction<ActionTypes.GET_INITIAL_GAME_DATA_SUCCESS, { gameData: IState }> => ({
  data: { gameData },
  type: ActionTypes.GET_INITIAL_GAME_DATA_SUCCESS,
});

export const spawnCoin = (baseID: IBase['ID'], coinID: ICoin['coinID'], isOnClickMove = false): IReduxAction<ActionTypes.SPAWN_COIN, { baseID: IBase['ID'], coinID: ICoin['coinID'], isOnClickMove: boolean }> => ({
  data: { baseID, coinID, isOnClickMove },
  type: ActionTypes.SPAWN_COIN,
});

export const spawnCoinSuccess = (
  cellID: ICell['cellID'],
  coinID: ICoin['coinID'],
  _baseID: IBase['ID'],
  position: IWalkway['position'],
): IReduxAction<ActionTypes.SPAWN_COIN_SUCCESS, { cellID: ICell['cellID'], coinID: ICoin['coinID'], position: IWalkway['position'] }> => ({
  data: { cellID, coinID, position },
  type: ActionTypes.SPAWN_COIN_SUCCESS,
});

export const moveCoin = (coinID: ICoin['coinID'], walkwayPosition: WalkwayPosition, cellID: ICell['cellID']): IReduxAction<ActionTypes.MOVE_COIN, { coinID: ICoin['coinID']; walkwayPosition: WalkwayPosition; cellID: ICell['cellID']; }> => ({
  data: { cellID, coinID, walkwayPosition },
  type: ActionTypes.MOVE_COIN,
});

export const placeCoin = (cellID: ICell['cellID'], coinID: ICoin['coinID'], walkwayPosition: WalkwayPosition): IReduxAction<ActionTypes.PLACE_COIN, { coinID: ICoin['coinID']; walkwayPosition: WalkwayPosition; cellID: ICell['cellID']; }> => ({
  data: { cellID, coinID, walkwayPosition },
  type: ActionTypes.PLACE_COIN,
});

export const liftCoin = (cellID: ICell['cellID'], coinID: ICoin['coinID'], walkwayPosition: WalkwayPosition): IReduxAction<ActionTypes.LIFT_COIN, { coinID: ICoin['coinID']; walkwayPosition: WalkwayPosition; cellID: ICell['cellID']; }> => ({
  data: { cellID, coinID, walkwayPosition },
  type: ActionTypes.LIFT_COIN,
});

export const nextTurn = (): IReduxAction<ActionTypes.NEXT_TURN, void> => ({
  type: ActionTypes.NEXT_TURN,
});

export const passTurnTo = (baseID: IBase['ID']): IReduxAction<ActionTypes.PASS_TURN_TO, { baseID: IBase['ID'] }> => ({
  data: { baseID },
  type: ActionTypes.PASS_TURN_TO,
});

export const markCurrentBase = (spawnable: boolean): IReduxAction<ActionTypes.MARK_CURRENT_BASE, { spawnable: boolean }> => ({
  data: { spawnable },
  type: ActionTypes.MARK_CURRENT_BASE,
});

export const markWinner = (baseID: BaseID): IReduxAction<ActionTypes.MARK_WINNER, { baseID: BaseID }> => ({
  data: { baseID },
  type: ActionTypes.MARK_WINNER,
});

export const moveCoinSuccess = (bonusChance: boolean, coinID: ICoin['coinID'], currentDieRoll: Rolls): IReduxAction<ActionTypes.MOVE_COIN_SUCCESS, { bonusChance: boolean, coinID: ICoin['coinID'], currentDieRoll: Rolls }> => ({
  data: { bonusChance, currentDieRoll, coinID },
  type: ActionTypes.MOVE_COIN_SUCCESS,
});

export const moveCoinFailure = (): IReduxAction<ActionTypes.MOVE_COIN_FAILURE, void> => ({
  type: ActionTypes.MOVE_COIN_FAILURE,
});

export const disqualifyCoin = (coinID: ICoin['coinID'], walkwayPosition: WalkwayPosition, cellID: ICell['cellID']): IReduxAction<ActionTypes.DISQUALIFY_COIN, { coinID: ICoin['coinID'], walkwayPosition: WalkwayPosition, cellID: ICell['cellID'] }> => ({
  data: { coinID, walkwayPosition, cellID },
  type: ActionTypes.DISQUALIFY_COIN,
});

export const homeCoin = (coinID: ICoin['coinID']): IReduxAction<ActionTypes.HOME_COIN, { coinID: ICoin['coinID'] }> => ({
  data: { coinID },
  type: ActionTypes.HOME_COIN,
});

export const setPlayers = (playerCount: number): IReduxAction<ActionTypes.SET_PLAYERS, { playerCount: number }> => ({
  data: { playerCount },
  type: ActionTypes.SET_PLAYERS,
});

export const enableBase = (baseID: BaseID): IReduxAction<ActionTypes.ENABLE_BASE, { baseID: BaseID }> => ({
  data: { baseID },
  type: ActionTypes.ENABLE_BASE,
});

export const updateBase = (baseID: IBase['ID'], base: IBase): IReduxAction<ActionTypes.UPDATE_BASE, { baseID: IBase['ID'], base: IBase }> => ({
  data: { baseID, base },
  type: ActionTypes.UPDATE_BASE,
});

export const updateLife = (baseID: IBase['ID'], life: number): IReduxAction<ActionTypes.UPDATE_LIFE, { baseID: IBase['ID'], life: number }> => ({
  data: { baseID, life },
  type: ActionTypes.UPDATE_LIFE,
});

export const leaveRoom = (): IReduxAction<ActionTypes.LEAVE_ROOM, void> => ({
  type: ActionTypes.LEAVE_ROOM,
});

export const disableBase = (baseID: BaseID): IReduxAction<ActionTypes.DISABLE_BASE, { baseID: BaseID }> => ({
  data: { baseID },
  type: ActionTypes.DISABLE_BASE,
});

export const winTimeDisableBase = (baseID: BaseID): IReduxAction<ActionTypes.WIN_TIME_DISABLE_BASE, { baseID: BaseID }> => ({
  data: { baseID },
  type: ActionTypes.WIN_TIME_DISABLE_BASE,
});

export const getAddress = (address: string): IReduxAction<ActionTypes.GET_ADDRESS, { address: string }> => ({
  data: { address },
  type: ActionTypes.GET_ADDRESS,
});

export const setWinners = (id: string): IReduxAction<ActionTypes.SET_WINNER, { id: string }> => ({
  data: { id },
  type: ActionTypes.SET_WINNER,
});


export const sixDieRollCount_treeTime = (cells: {
  [walkwayPosition: string]: {
    [cellID: string]: ICell;
  };
}, coins: { [coinID: string]: ICoin; }): IReduxAction<ActionTypes.SIX_DIE_ROLL_THREE_TIME, {
  cells: {
    [walkwayPosition: string]: {
      [cellID: string]: ICell;
    };
  }, coins: { [coinID: string]: ICoin; } }> => ({
  data: { cells, coins },
  type: ActionTypes.SIX_DIE_ROLL_THREE_TIME,
});




export type Actions =
  | ReturnType<typeof getInitialGameDataSuccess>
  | ReturnType<typeof spawnCoin>
  | ReturnType<typeof spawnCoinSuccess>
  | ReturnType<typeof moveCoin>
  | ReturnType<typeof liftCoin>
  | ReturnType<typeof placeCoin>
  | ReturnType<typeof nextTurn>
  | ReturnType<typeof passTurnTo>
  | ReturnType<typeof markCurrentBase>
  | ReturnType<typeof moveCoinSuccess>
  | ReturnType<typeof disqualifyCoin>
  | ReturnType<typeof homeCoin>
  | ReturnType<typeof setPlayers>
  | ReturnType<typeof updateBase>
  | ReturnType<typeof enableBase>
  | ReturnType<typeof disableBase>
  | ReturnType<typeof winTimeDisableBase>
  | ReturnType<typeof markWinner>
  | ReturnType<typeof getAddress>
  | ReturnType<typeof setWinners>
  | ReturnType<typeof leaveRoom>
  | ReturnType<typeof updateLife>
  | ReturnType<typeof sixDieRollCount_treeTime>
  ;
