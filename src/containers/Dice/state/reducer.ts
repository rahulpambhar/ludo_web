import { Actions, ActionTypes } from './actions';
import { IState, Rolls } from './interfaces';

const initialState: IState = {
  isDieRollAllowed: true,
  isDieRollValid: false,
  roll: Rolls.ONE,
  isTimerRunning: false,
  TIME_LIMIT: 0,
  timePassed: 0,
  timeLeft: 30,
  remainingPathColor: 'green',
};

export const reducer = (state: IState = initialState, action: Actions): IState => {
  switch (action.type) {

    case ActionTypes.ROLL_DIE_COMPLETE: {
      return {
        ...state,
        isDieRollAllowed: false,
        isDieRollValid: true,
        roll: action.data!.value,
      };
    }
    case ActionTypes.ENABLE_DIE: {
      return {
        ...state,
        isDieRollAllowed: true,
      };
    }
    case ActionTypes.DISABLE_DIE: {
      return {
        ...state,
        isDieRollAllowed: false,
      };
    }
    case ActionTypes.INVALIDATE_DIE_ROLL: {
      return {
        ...state,
        isDieRollValid: false,
      };
    }
    case ActionTypes.SET_LOADER_STATE: {

      return {
        ...state,
        isTimerRunning: true,
        TIME_LIMIT: 30
      };
    }

    case ActionTypes.SET_TIME_LIMIT_FOR_SERVER: {
      return {
        ...state,
        TIME_LIMIT: 30
      };
    }

    case ActionTypes.REMAINIING_PATH_COLOR: {
      const { timeLeft } = action.data!;
      if (timeLeft <= 5) {
        return {
          ...state,
          remainingPathColor: 'red'
        };
      }
      else if (timeLeft <= 10) {
        return {
          ...state,
          remainingPathColor: 'orange'
        };
      }
      return {
        ...state,
        remainingPathColor: 'blue'
      }
    }

    case ActionTypes.LOADER_CLEAR: {
      return {
        ...state,
        isTimerRunning: false,
        TIME_LIMIT: 0,
        timePassed: 0,
        timeLeft: 30
      };
    }

    case ActionTypes.SET_TIME_PASSED: {
      const { timePassed, timeLeft } = action.data!;
      return {
        ...state,
        timePassed: timePassed,
        timeLeft: timeLeft
      };
    }

    default:
      return state;
  }
}
