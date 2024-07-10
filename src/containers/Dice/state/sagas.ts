/* eslint-disable require-yield */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  delay,
  put,
  takeLatest,
} from 'redux-saga/effects';
// import socket from '../../../connections/socket';

import { ActionTypes, loaderClear, setTimePassed, enableDie } from './actions';

// function* watchForRollDie() {
//   yield takeLatest(ActionTypes.ROLL_DIE, rollDieSaga);
// }

// function* rollDieSaga(action: ReturnType<typeof rollDie>) {
//   const { value } = action.data!;
//   socket.emit('dieRoll', value);
// }

function* watchForEnableDie() {
  yield takeLatest(ActionTypes.ENABLE_DIE, enableDieSaga);
}

function* enableDieSaga(action: ReturnType<typeof enableDie>) {
  yield put(loaderClear());
  let { timeLeft } = action.data!;
  let timePassed = 0;
  let start = true;
  while (start) {
    yield delay(1000);
    yield put(setTimePassed(timePassed, timeLeft));
    timeLeft--;
    timePassed++;
    if (timeLeft < 0) {
      start = false;
    }
  }
}

export const sagas = [
  // watchForRollDie,
  watchForEnableDie,
];
