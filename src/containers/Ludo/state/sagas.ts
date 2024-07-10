/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-yield */
/* eslint-disable prefer-const */
import {
  call,
  delay,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import { api } from '../../../connections/http';
import { mapByProperty } from '../../../connections/utils';
import { invalidateDieRoll } from '../../../containers/Dice/state/actions';
import { Rolls } from '../../../containers/Dice/state/interfaces';
import { currentDieRollSelector } from '../../../containers/Dice/state/selectors';
import { WINNING_MOVES } from '../../../globalConstants';
import { WalkwayPosition, } from '../../../state/interfaces';

import {
  disqualifyCoin,
  getInitialGameDataSuccess,
  homeCoin,
  liftCoin,
  markWinner,
  moveCoin,
  moveCoinSuccess,
  placeCoin,
  spawnCoin,
  spawnCoinSuccess,
  ActionTypes,
} from './actions';
import {
  BaseID,
  CellType,
  ICell,
  ICoin,
  IServerGameData,
  IState,
} from './interfaces';
import {
  basesSelector,
  cellsSelector,
  coinsSelector,
  currentTurnSelector,
  linksSelector,
  walkwaysSelector,
} from './selectors';

import moveCoinSound from '../../../sound/movement.mp3';
import disqualifyCoinSound from '../../../sound/kill_sound.mp3';
import spawnCoinSound from '../../../sound/spawn.mp3';

const moveSound = new Audio(moveCoinSound);
const disqualifySound = new Audio(disqualifyCoinSound);
const spawnSound = new Audio(spawnCoinSound);

function* watchForGetInitialGameData() {
  yield takeLatest(ActionTypes.GET_INITIAL_GAME_DATA, getInitialGameDataSaga);
}

function* getInitialGameDataSaga() {

  const data: IServerGameData = yield call(api.get, { url: '/initialGameData.json' });

  const basesArray = data.bases.map((base) => ({ ...base, spawnable: false }));

  const bases = mapByProperty(basesArray, 'ID');
  const coins = data.coins.map((coin) => ({ ...coin, color: bases[coin.baseID].color }));

  const gameData: IState = {
    bases,
    cells: data.cells,
    coins: mapByProperty(coins, 'coinID'),
    currentTurn: BaseID.BASE_3,
    links: data.links,
    relationships: data.relationships,
    walkways: mapByProperty(data.walkways, 'ID'),
    address: ""
  };

  yield put(getInitialGameDataSuccess(gameData));
}

function* watchForSpawnCoin() {
  yield takeLatest(ActionTypes.SPAWN_COIN, spawnCoinSaga);
}

function* spawnCoinSaga(action: ReturnType<typeof spawnCoin>) {
  const { baseID, coinID } = action.data!;

  const bases: ReturnType<typeof basesSelector> = yield select(basesSelector);
  const walkways: ReturnType<typeof walkwaysSelector> = yield select(walkwaysSelector);
  const cells: ReturnType<typeof cellsSelector> = yield select(cellsSelector);
  const base = bases[baseID];
  const walkway = Object.values(walkways).find((walkway) => walkway.baseID === baseID)!;
  const walkwayCells = cells[walkway.position];
  const spawnCellForCoin = Object.values(walkwayCells).find((cell) => cell.cellType === CellType.SPAWN)!;
  const coinIDToSpawn = base.coinIDs.find((ID) => ID === coinID)!;

  yield put(spawnCoinSuccess(spawnCellForCoin.cellID, coinIDToSpawn, baseID, walkway.position));
  yield put(invalidateDieRoll());

}

function* watchForSpawnCoinSuccess() {
  yield takeLatest(ActionTypes.SPAWN_COIN_SUCCESS, spawnCoinSuccessSaga);
}

function* spawnCoinSuccessSaga(_action: ReturnType<typeof spawnCoinSuccess>) {
  spawnSound.play();
}

function* watchForMoveCoin() {
  yield takeLatest(ActionTypes.MOVE_COIN, moveCoinSaga);
}

function* isCurrentMoveValid(coinID: ICoin['coinID'], stepsToTake: Rolls) {
  const coins: ReturnType<typeof coinsSelector> = yield select(coinsSelector);
  const coin = coins[coinID];
  return coin.steps + stepsToTake <= WINNING_MOVES;
}

export function* getMovableCoins(stepsToTake: Rolls) {
  const coins: ReturnType<typeof coinsSelector> = yield select(coinsSelector);
  const currentTurnBase: ReturnType<typeof currentTurnSelector> = yield select(currentTurnSelector);
  const bases: ReturnType<typeof basesSelector> = yield select(basesSelector);
  const movableCoins =
    bases[currentTurnBase].coinIDs
      .filter((coinID) =>
        coins[coinID].isSpawned
        && !coins[coinID].isRetired
        && coins[coinID].steps + stepsToTake <= WINNING_MOVES,
      );
  return movableCoins;
}

function* moveCoinSaga(action: ReturnType<typeof moveCoin>) {

  let { cellID, walkwayPosition } = { ...action.data! };

  const { coinID } = action.data!;
  const currentDieRoll: ReturnType<typeof currentDieRollSelector> = yield select(currentDieRollSelector);

  const movableCoins: ICoin['coinID'][] = yield call(getMovableCoins, currentDieRoll);
  const isCurrentMovePossible: boolean = yield call(isCurrentMoveValid, coinID, currentDieRoll);

  if (movableCoins.length === 0) {
    return;
  } else if (!isCurrentMovePossible) {
    return;
  }

  yield put(invalidateDieRoll());

  let bonusChanceForHomeCoin = false;

  for (let i = 0; i < currentDieRoll; i++) {
    const coins: ReturnType<typeof coinsSelector> = yield select(coinsSelector);
    const cells: ReturnType<typeof cellsSelector> = yield select(cellsSelector);
    const links: ReturnType<typeof linksSelector> = yield select(linksSelector);
    const nextCells = links[cellID];
    let nextCell;

    // Possibility of entering HOMEPATH
    nextCell = nextCells.length > 1
      ? nextCells.find(
        (cell) =>
          cells[cell.position][cell.cellID].cellType === CellType.HOMEPATH
          && coins[coinID].baseID === cells[cell.position][cell.cellID].baseID,
      ) || nextCells[0]
      : nextCells[0];

    yield put(liftCoin(cellID, coinID, walkwayPosition));
    if (nextCell.cellID === 'HOME') {
      yield put(homeCoin(coinID));
      bonusChanceForHomeCoin = true;
    } else {
      yield put(placeCoin(nextCell.cellID, coinID, nextCell.position));
    }

    yield delay(300);
    moveSound.play();

    cellID = nextCell.cellID;
    walkwayPosition = nextCell.position;
  }

  const bonusChance = bonusChanceForHomeCoin
    || (yield call(performDisqualificationCheck, action.data!.coinID, walkwayPosition, cellID))
    || (currentDieRoll === Rolls.SIX);

  yield put(moveCoinSuccess(bonusChance, coinID, currentDieRoll));
}

function* performDisqualificationCheck(activeCoinID: ICoin['coinID'], walkwayPosition: WalkwayPosition, cellID: ICell['cellID']) {
  if (cellID === 'HOME') {
    return false;
  }
  const cells: ReturnType<typeof cellsSelector> = yield select(cellsSelector);
  const coins: ReturnType<typeof coinsSelector> = yield select(coinsSelector);

  const activeCoin = coins[activeCoinID];
  const cellInWhichCoinLanded = cells[walkwayPosition][cellID];
  if (cellInWhichCoinLanded.cellType === CellType.NORMAL) {
    // Check if the coin disqualifies another of a different base
    for (const coinID of cellInWhichCoinLanded.coinIDs) {
      const coin = coins[coinID];
      if (activeCoin.baseID !== coin.baseID) {
        disqualifySound.play();
        yield put(disqualifyCoin(coinID, walkwayPosition, cellID));
        return true;
      }
    }
  }
  return false;
}

// function* watchForDisqualify() {
//   yield takeLatest(ActionTypes.DISQUALIFY_COIN, disqualifyCoinSaga);
// }

// function* disqualifyCoinSaga(_action: ReturnType<typeof disqualifyCoin>) {
//   disqualifySound.play();
// }

function* watchForHomeCoin() {
  yield takeLatest(ActionTypes.HOME_COIN, homeCoinSaga);
}

function* homeCoinSaga(action: ReturnType<typeof homeCoin>): Generator<any, void, any> {

  const { coinID } = action.data!;

  const coins: ReturnType<typeof coinsSelector> = yield select(coinsSelector);
  const bases: ReturnType<typeof basesSelector> = yield select(basesSelector);
  const { baseID } = coins[coinID];
  const base = bases[baseID];
  const retiredCoins = base.coinIDs.filter((coinID) => coins[coinID].isRetired);

  const hasWon = retiredCoins.length === base.coinIDs.length;
  if (hasWon) {
    yield put(markWinner(baseID));
  }
}

export const sagas = [
  watchForGetInitialGameData,
  watchForSpawnCoinSuccess,
  watchForSpawnCoin,
  watchForMoveCoin,
  watchForHomeCoin,
  // watchForDisqualify
];
