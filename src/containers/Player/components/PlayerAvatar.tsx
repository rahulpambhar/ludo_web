/* eslint-disable no-self-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { connect } from 'react-redux';
// import { getBaseHexColor } from '../../containers/utils';
import { BaseColors } from '../../../state/interfaces';
import { remainingPathColorSelector, timeLeftSelector, LoaderSelector } from '../../Dice/state/selectors';
import { createStructuredSelector } from 'reselect';
import { setRemainingPathColor, setTimePassed, setTimeLimitForServer } from '../../Dice/state/actions';

import styles from './PlayerAvatar.module.css';


interface IPublicProps {
  baseColor: BaseColors;
  currentTurn: string;
  baseID: string;
  myBase: string;
}

interface IStateProps {
  timeLeft: ReturnType<typeof timeLeftSelector>;
  remainingPathColor: ReturnType<typeof remainingPathColorSelector>;
  LOADER: ReturnType<typeof LoaderSelector>;
}

interface IDispatchProps {
  setRemainingPathColor: typeof setRemainingPathColor;
  setTimePassed: typeof setTimePassed;
  setTimeLimitForServer: typeof setTimeLimitForServer;
}

interface IProps extends IPublicProps, IStateProps, IDispatchProps { }

const mapStateToProps = createStructuredSelector<any, any>({
  timeLeft: timeLeftSelector,
  remainingPathColor: remainingPathColorSelector,
  LOADER: LoaderSelector,
});

const mapDispatchToProps = {
  setRemainingPathColor,
  setTimePassed,
  setTimeLimitForServer
};

class PlayerAvataR extends React.PureComponent<IProps> {

  calculateTimeFraction() {
    const { timeLeft } = this.props
    const rawTimeFraction = timeLeft / 30;
    return rawTimeFraction - (1 / 30) * (1 - rawTimeFraction);
  }

  formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = seconds;
    }
    return `${minutes}:${seconds}`;
  }

  render() {
    const { baseID, remainingPathColor, currentTurn } = this.props;

    const circleDasharray = `${(this.calculateTimeFraction() * 283).toFixed(0)} 283`;

    return (
      <div className={styles.Container}>
        <div className={styles.diebg} >
          {
            baseID === currentTurn ?
              <div className='position-relative'>
                {
                  <div>
                    <span id="base-timer-label" className="">
                      {/* {this.formatTime(timeLeft)} */}
                    </span>
                    <div className="base-timer-red">
                      <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g className="base-timer__circle">
                          <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                          <path
                            id="base-timer-path-remaining"
                            strokeDasharray={circleDasharray}
                            className={`base-timer__path-remaining ${remainingPathColor}`}
                            d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                }
                <img src='images/avtar.png' className={styles.avtar} alt=""></img>
              </div>
              : ""
          }
        </div>
      </div>
    );
  }
}

export const PlayerAvatar = connect(mapStateToProps, mapDispatchToProps)(PlayerAvataR) as unknown as React.ComponentClass<IPublicProps, IProps>;
