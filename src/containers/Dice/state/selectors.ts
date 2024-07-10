import { createSelector } from 'reselect';

import { IApplicationState } from '../../../state/interfaces';

import { IState } from './interfaces';

export const diceStateSelector = (state: IApplicationState): IState => state.dice;

export const currentDieRollSelector = createSelector(
  [diceStateSelector],
  (state) => state.roll,
);

export const isDieRollAllowedSelector = createSelector(
  [diceStateSelector],
  (state) => state.isDieRollAllowed,
);

export const isDieRollValidSelector = createSelector(
  [diceStateSelector],
  (state) => state.isDieRollValid,
);

export const LoaderSelector = createSelector(
  [diceStateSelector],
  (state) => state,
);

export const timeLeftSelector = createSelector(
  [diceStateSelector],
  (state) => state.timeLeft,
);

export const remainingPathColorSelector = createSelector(
  [diceStateSelector],
  (state) => state.remainingPathColor,
);

