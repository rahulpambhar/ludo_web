/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import classnames from 'classnames';
import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import { getStyleObject } from '../../containers/utils';
// import { DICE_SIZE } from '../../globalConstants';
import { BaseColors, } from '../../state/interfaces';

import { rollDie, rollDieComplete } from './state/actions';
// import { CONFIGURATIONS } from './state/constants';
import { currentDieRollSelector, isDieRollAllowedSelector, isDieRollValidSelector } from './state/selectors';

import { currentTurnSelector, store } from '../../containers/Ludo/state/selectors';
import styles from './Container.module.css';
import { BaseID } from "../Ludo/state/interfaces";
import socket from "../../connections/socket";

interface IStateProps {
  currentDieRoll: ReturnType<typeof currentDieRollSelector>;
  isDieRollAllowed: ReturnType<typeof isDieRollAllowedSelector>;
  currentTurn: ReturnType<typeof currentTurnSelector>;
  store: ReturnType<typeof store>;
  isDieRollValid: ReturnType<typeof isDieRollValidSelector>;
}

interface IDispatchProps {
  rollDie: typeof rollDie;
  rollDieComplete: typeof rollDieComplete;
}

interface IPublicProps {
  baseColor: BaseColors;
  myBase: string;
  baseID: BaseID;
  isDisabled: boolean;
}

// interface IStates {
//   players: { [color: string]: number }[];
//   value: number;
//   gameStart: boolean;
// }

interface IProps extends IStateProps, IDispatchProps, IPublicProps { }

const mapStateToProps = createStructuredSelector<any, any>({
  currentDieRoll: currentDieRollSelector,
  isDieRollAllowed: isDieRollAllowedSelector,
  currentTurn: currentTurnSelector,
  store: store,
  isDieRollValid: isDieRollValidSelector,
});

const mapDispatchToProps = {
  rollDie,
  rollDieComplete,
};


class DiceBare extends React.PureComponent<IProps> {
  state: any = {
    angleX: 0,
    angleY: 0,
    result: 1,
    delay: 0,
    canRoll: true,
    MY_BASE: ""
  };

  getRandomInt = (max: any) => {
    return Math.floor(Math.random() * max);
  }

  componentDidMount(): void {
    socket.on('dieRoll', async (payload: any) => {
      const { angleX, angleY, delay, myBase } = payload
      this.setState({ angleX, angleY, delay, MY_BASE: myBase });
    });
  }



  render() {
    const { baseColor, baseID, myBase, isDieRollAllowed, } = this.props;
    const { angleX, angleY, delay, MY_BASE } = this.state;

    const diceStyle = {
      transform: `rotateX(${angleX}deg) rotateY(${angleY}deg)`,
      transitionDuration: `${delay}ms`,
    };

    const diceStyleDefault = {
      transform: `rotateX(${0}deg) rotateY(${0}deg)`,
      transitionDuration: `${0}ms`,
    };


    // const dieClassNames = isDieRollAllowed ? [styles.Die] : [styles.Die, styles.Disabled];
    const dieClassNames = baseID === MY_BASE ? diceStyle : diceStyleDefault;
    // this.disable ? dieClassNames.push(styles.rolling) : dieClassNames

    return (
      <>
        {
          // isDieRollAllowed && currentDieRoll ?
          < div className={styles.Container}>
            <div className='dice-container ' onClick={() => {
              if (baseID === myBase && isDieRollAllowed === true) {
                socket.emit('dieRoll', baseID);
              } else if (isDieRollAllowed === false) {
                alert(`Wait Plz`)
              } else {
                alert(`Wait Plz Its "${baseColor}"s Turn`)
              }
            }} >
              <div className='dice' style={dieClassNames}>
                <div className='face' data-id='1'>
                  <div className="point point-middle point-center">
                  </div>
                </div>
                <div className='face' data-id='2'>
                  <div className="point point-top point-right">
                  </div>
                  <div className="point point-bottom point-left">
                  </div>
                </div>
                <div className='face' data-id='6'>
                  <div className="point point-top point-right">
                  </div>
                  <div className="point point-top point-left">
                  </div>
                  <div className="point point-middle point-right">
                  </div>
                  <div className="point point-middle point-left">
                  </div>
                  <div className="point point-bottom point-right">
                  </div>
                  <div className="point point-bottom point-left">
                  </div>
                </div>
                <div className='face' data-id='5'>
                  <div className="point point-top point-right">
                  </div>
                  <div className="point point-top point-left">
                  </div>
                  <div className="point point-middle point-center">
                  </div>
                  <div className="point point-bottom point-right">
                  </div>
                  <div className="point point-bottom point-left">
                  </div>
                </div>
                <div className='face' data-id='3'>
                  <div className="point point-top point-right">
                  </div>
                  <div className="point point-middle point-center">
                  </div>
                  <div className="point point-bottom point-left">
                  </div>
                </div>
                <div className='face' data-id='4'>
                  <div className="point point-top point-right">
                  </div>
                  <div className="point point-top point-left">
                  </div>
                  <div className="point point-bottom point-right">
                  </div>
                  <div className="point point-bottom point-left">
                  </div>
                </div>
              </div>
            </div>

          </ div>

        }
      </>

    );
  }

  // private renderDots = () => {


  // const { baseID, myBase } = this.props;
  // const elements: any[] = [];
  // if (baseID === myBase) {
  //   const configurationForCurrentRoll = CONFIGURATIONS[this.props.currentDieRoll];

  //   for (let i = 0; i < configurationForCurrentRoll.length; i++) {
  //     const isVisible = Boolean(configurationForCurrentRoll[i]);
  //     const classNames = isVisible ? styles.Dot : [styles.Dot, styles.Invisible];
  //     elements.push(
  //       <div className={classnames(classNames)} key={i} />,
  //     );
  //   }
  // } else {
  //   const configurationForCurrentRoll = CONFIGURATIONS[this.props.currentDieRoll];

  //   for (let i = 0; i < configurationForCurrentRoll.length; i++) {
  //     const isVisible = Boolean(configurationForCurrentRoll[i]);
  //     const classNames = isVisible ? styles.Dot : [styles.Dot, styles.Invisible];
  //     elements.push(
  //       <div className={classnames(classNames)} key={i} />,
  //     );
  //   }
  // }

  // return elements;
  // }
}

export const Dice = connect(mapStateToProps, mapDispatchToProps)(DiceBare) as unknown as React.ComponentClass<IPublicProps>;
