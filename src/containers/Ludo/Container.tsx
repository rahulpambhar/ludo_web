/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Zoompage from './Zoompage';
import { Base } from '../../containers/Base/Container';
import { Home } from '../../containers/Home/Container';
import { Player } from '../../containers/Player/Container';
import { Walkway } from '../../containers/Walkway/Container';
import { getStyleObject } from '../../containers/utils';
import { BOARD_SIZE } from '../../globalConstants';
import { ContextMenu } from '../../services/contextMenu/Container';
import { getInitialGameData, setPlayers, getInitialGameDataSuccess, disableBase, setWinners, enableBase, updateBase, passTurnTo, spawnCoinSuccess, moveCoin, markCurrentBase, sixDieRollCount_treeTime } from './state/actions';
import { rollDieComplete, enableDie, invalidateDieRoll } from '../Dice/state/actions';
import { updateLife } from './state/actions';

import ErrorModel from '../layout/ErrorModel';
import SuccessModel from '../layout/SuccessModel'
import { Message } from '../Pages/pageInterface'
import { getError } from '../../containers/utils';
import { getSuccess } from '../../containers/utils';

import roll_dice from "../../sound/dice.mp3";
import gameSound from "../../sound/ludo_Waiting_sound.mp3";
import startGameSound from "../../sound/start_Game.mp3";
import winingSound from "../../sound/wining.mp3";


import {
  BaseID, BoardEntities,
  // ICell,
  // ICoin,
  IState
} from './state/interfaces';

import {
  basesSelector,
  currentTurnSelector,
  relationshipsSelector,
  walkwaysSelector,
  addressSelector,
  store
} from './state/selectors';

import styles from './Container.module.css';
import socket from "../../connections/socket";
import Ludorightsection from './Ludorightsection';
import Homeicon from './corner_components/Homeicon';
import Zoomicon from './corner_components/Zoomicon';
import Soundicon from './corner_components/Soundicon';
import Chaticon from './corner_components/Chaticon';

interface IDispatchProps {
  getInitialGameData: typeof getInitialGameData;
  setPlayers: typeof setPlayers;
  getInitialGameDataSuccess: typeof getInitialGameDataSuccess;
  disableBase: typeof disableBase;
  setWinners: typeof setWinners;
  getSuccess: typeof getSuccess;
  getError: typeof getError;
  updateLife: typeof updateLife;
  enableBase: typeof enableBase;
  updateBase: typeof updateBase;
  passTurnTo: typeof passTurnTo;
  enableDie: typeof enableDie;
  invalidateDieRoll: typeof invalidateDieRoll;
  markCurrentBase: typeof markCurrentBase;
  spawnCoinSuccess: typeof spawnCoinSuccess;
  moveCoin: typeof moveCoin;
  rollDieComplete: typeof rollDieComplete;
  sixDieRollCount_treeTime: typeof sixDieRollCount_treeTime;
}

interface IStateProps {
  bases: ReturnType<typeof basesSelector>;
  relationships: ReturnType<typeof relationshipsSelector>;
  walkways: ReturnType<typeof walkwaysSelector>;
  currentTurn: ReturnType<typeof currentTurnSelector>;
  Address: ReturnType<typeof addressSelector>;
  store: ReturnType<typeof store>;
}

interface IPublicProps { }
interface IProps extends IPublicProps, IStateProps, IDispatchProps { }

interface IStates {
  room_code: string;
  creator: string;
  myBase: string;
  address: string;
  isStarted: boolean;
  isOnline: boolean;
  playersLength: number;
  showPlayerConfiguration: boolean;
  joiner: boolean;
  gameStatus: boolean;
  toggleStartGameSound: boolean;
  base: string;
  modelMessage: Message;
  rollDies: HTMLAudioElement;
  startSound: HTMLAudioElement;
  gameSound: HTMLAudioElement;
  winingSound: HTMLAudioElement;
}

const mapStateToProps = createStructuredSelector<any, any>({
  bases: basesSelector,
  currentTurn: currentTurnSelector,
  relationships: relationshipsSelector,
  walkways: walkwaysSelector,
  Address: addressSelector,
  store: store,
});

const mapDispatchToProps = {
  setPlayers,
  getInitialGameData,
  getInitialGameDataSuccess,
  disableBase,
  setWinners,
  updateLife,
  enableBase,
  updateBase,
  passTurnTo,
  enableDie,
  invalidateDieRoll,
  markCurrentBase,
  spawnCoinSuccess,
  moveCoin,
  rollDieComplete,
  sixDieRollCount_treeTime
};

class LudoBare extends React.PureComponent<IProps, IStates, any> {
  state: IStates = {
    room_code: "",
    creator: "",
    myBase: "",
    address: "",
    isStarted: false,
    isOnline: navigator.onLine,
    playersLength: 0,
    showPlayerConfiguration: true,
    joiner: false,
    gameStatus: false,
    toggleStartGameSound: false,
    base: "",
    modelMessage: {
      headerMessage: '',
      paragraphMessage: '',
      spanMessage: '',
      other: '',
    },
    rollDies: new Audio(roll_dice),
    startSound: new Audio(startGameSound),
    gameSound: new Audio(gameSound),
    winingSound: new Audio(winingSound),
  }

  handleOnlineStatus = () => {
    this.setState({
      isOnline: navigator.onLine
    })
    if (this.state.isOnline) {
      location.reload();
    }
    if (!this.state.isOnline) {
      this.setState({
        modelMessage: {
          headerMessage: "Network Not Found", paragraphMessage: 'Loose connection may effect your Game!!', spanMessage: '', other: ""
        }
      })
      getError()
    }
  };
  delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  componentDidMount() {
    window.addEventListener('online', this.handleOnlineStatus);
    window.addEventListener('offline', this.handleOnlineStatus);

    // this.state.gameSound.play();
    const address = localStorage.getItem('address');
    const name = localStorage.getItem('name');
    const room_code = localStorage.getItem('room_code');


    if (address && name && room_code) {
      const params = {
        name: name,
        address: address,
        room_code: localStorage.getItem('room_code'),
      }

      socket.emit('join-room', params, async (data: any) => {
        if (data.st) {
          const roomInfo = data.roomInfo;
          const gameData: IState = data.roomState;
          const myBase = data.myBase;

          gameData.address = address;
          gameData.myBase = myBase;

          let playersLength = 0;
          if (roomInfo.players.BASE_1) {
            playersLength++;
          }
          if (roomInfo.players.BASE_2) {
            playersLength++;
          }
          if (roomInfo.players.BASE_3) {
            playersLength++;
          }
          if (roomInfo.players.BASE_4) {
            playersLength++;
          }

          this.setState({
            room_code: room_code,
            myBase: myBase,
            address: address,
            creator: roomInfo.creator,
            isStarted: roomInfo.isStarted,
            playersLength: playersLength
          });
          this.props.getInitialGameDataSuccess(gameData);
          if (roomInfo.isStarted) {
            this.props.enableDie(data.timeLeft);
          }
        } else {
          alert(data.msg);
          window.location.href = "/"
        }
      })

      socket.on('gameStarted', (data: any) => {
        this.state.startSound.play();
        this.setState({ isStarted: data.isStarted })
      })

      socket.on('newPlayer', async (payload: any) => {
        try {
          if (payload.st) {
            const { baseID, base } = payload;
            this.props.updateBase(baseID, base)
            this.setState({
              playersLength: this.state.playersLength + 1
            });
          }
        } catch (err) {
          console.log(err);
        }
      });

      socket.on('nextTurn', (nextTurn: BaseID) => {
        this.props.passTurnTo(nextTurn);
      });

      socket.on('enableDie', () => {
        this.props.enableDie();
      });

      socket.on('dieRoll', async (payload: any) => {
        this.state.rollDies.play();
        this.props.rollDieComplete(payload.dieRoll);
      });

      socket.on('markBase', (spawnable: boolean) => {
        this.props.markCurrentBase(spawnable);
      })

      socket.on('moveCoin', ({ coinID, cellID, position }) => {
        this.props.moveCoin(coinID, position, cellID);
      });

      socket.on('closeRoom', (data) => {
        this.state.winingSound.play();
        alert("winners" + JSON.stringify(data));
        window.location.href = '/dashboard';
      });

      socket.on('spawnCoin', ({ cellID, coinID, baseID, position }) => {
        this.props.spawnCoinSuccess(cellID, coinID, baseID, position);
        this.props.invalidateDieRoll();
      });

      socket.on('life', ({ baseID, life }) => {
        this.props.updateLife(baseID, life)
        
      });

      socket.on('leavePlayer', (baseID) => {
        this.props.disableBase(baseID)
      });

      socket.on('sixDieRollCount_treeTime', (reverseObj: any) => {
        this.props.sixDieRollCount_treeTime(reverseObj.reverseCells, reverseObj.reverseCoins)
      });
    }
  }

  componentWillUnmount(): void {
    socket.off('join-room');
    socket.off('gameStarted');
    socket.off('newPlayer');
    socket.off('nextTurn');
    socket.off('startTurn');
    socket.off('dieRoll');
    socket.off('markBase');
    socket.off('moveCoin');
    socket.off('closeRoom');
    socket.off('spawnCoin');
  }

  // const fullScreenRef = useRef<FullScreenHandle>(null); // Make sure to import FullScreenHandle correctly

  // const enterFullScreen = () => {
  //   if (fullScreenRef.current) {
  //     fullScreenRef.current.enter();
  //   }
  // };

  // const exitFullScreen = () => {
  //   if (fullScreenRef.current) {
  //     fullScreenRef.current.exit();
  //   }
  // };

  render() {
    const { currentTurn } = this.props;

    return (
      <>
        <div className="ludo-section">
          <ErrorModel modelMessage={this.state.modelMessage} />
          <SuccessModel modelMessage={this.state.modelMessage} />
          <div className="container-fluid w-100 p-0">
            <div className="row g-0">

              <div className="col-lg-9 col-xl-9 col-xxl-9 col-md-12 col-sm-12 position-relative">

                {
                  this.state.creator === this.state.address ?
                    !this.state.isStarted ?
                      <div className='startgamepage'>
                        <div className="center-model">
                          <div className='start-box'>
                            <h5 className='mb-3'>Tap To Start</h5>
                            <p className='mb-3'>You can now play game</p>
                            <button type="button" className="back w-100 position-relative" style={{ zIndex: '999' }} onClick={() => {

                              if (this.state.playersLength >= 2) {
                                this.startGame()
                              } else {
                                alert("need two player to start game")
                              }
                            }}>Start Game</button>
                          </div>
                        </div>
                      </div> : ""
                    : !this.state.isStarted ? <div className='startgamepage'>
                      <div className="center-model">
                        <div className='start-box'>
                          <h5 className='mb-3'>waiting To Start</h5>
                          {/* <p className='mb-3'>You can now play game</p> */}
                          {/* <button type="button" className="back w-100 position-relative" style={{ zIndex: '999' }} onClick={() => { this.startGame() }}>Start Game</button> */}
                        </div>
                      </div>
                    </div> : ""
                }

                <h1 className='text-light'>{(this.state.isOnline)}</h1>

                <div className='position-relative mb-3 d-lg-none d-sm-block d-md-block d-xl-none d-xxl-none'>
                  <Homeicon />
                  <Zoomicon />
                </div>
                <div className='centered'>

                  <div className="container game-center" >
                    <div className={styles.GameContainer} style={{ position: 'fixed' }}>
                      <div className={styles.PlayerContainer}>
                        <Player baseID={BaseID.BASE_1} placement='top' disabled={currentTurn !== BaseID.BASE_1} currentTurn={currentTurn} myBase={this.state.myBase} />
                        <Player baseID={BaseID.BASE_3} placement='bottom' disabled={currentTurn !== BaseID.BASE_3} currentTurn={currentTurn} myBase={this.state.myBase} />
                      </div>
                      <div className={styles.backgruond}>
                        <div className={styles.Board} style={getStyleObject(BOARD_SIZE, BOARD_SIZE)}>
                          {this.state.isOnline ? this.renderBoardEntities() : <h1 className='text-light'>Network Is Not Connected...</h1>}
                        </div>
                        {/* center-logo */}
                        <div className='arrow-green'>
                          <img src='./images/arrow.png' alt="" />
                        </div>
                        <div className='arrow-red'>
                          <img src='./images/arrow.png' alt="" />
                        </div>
                        <div className='arrow-blue'>
                          <img src='./images/arrow.png' alt="" />
                        </div>
                        <div className='arrow-yellow'>
                          <img src='./images/arrow.png' alt="" />
                        </div>
                        <div className='arrow-angle-yellow'>
                          <img src='./images/arrow-angle.png' alt="" />
                        </div>
                        <div className='arrow-angle-blue'>
                          <img src='./images/arrow-angle.png' alt="" />
                        </div>
                        <div className='arrow-angle-green'>
                          <img src='./images/arrow-angle.png' alt="" />
                        </div>
                        <div className='arrow-angle-red'>
                          <img src='./images/arrow-angle.png' alt="" />
                        </div>
                        <div className='centerlogo'>
                          <div className="centerbox">
                            <img src="./images/center-logo.png" alt="" />
                          </div>
                        </div>
                      </div>
                      <div className={styles.PlayerContainer}>
                        <Player baseID={BaseID.BASE_2} placement='top' disabled={currentTurn !== BaseID.BASE_2} currentTurn={currentTurn} myBase={this.state.myBase} />
                        <Player baseID={BaseID.BASE_4} placement='bottom' disabled={currentTurn !== BaseID.BASE_4} currentTurn={currentTurn} myBase={this.state.myBase} />
                      </div>
                      <Zoompage />
                    </div>
                    {
                      process.env.NODE_ENV === 'development' ?
                        <ContextMenu />
                        : null
                    }
                  </div >
                </div>
                <div className='position-relative mt-3 d-lg-none d-sm-block d-md-block d-xl-none d-xxl-none'>
                  <Soundicon />
                  <Chaticon />
                </div>

              </div>
              <div className="col-lg-3 col-xl-3 col-xxl-3 col-md-4 col-sm-12 desk-mob">
                <Ludorightsection state={this.state} />
              </div>
            </div>

          </div>

        </div>
      </>
    );
  }

  private renderBoardEntities = () => {
    const {
      bases,
      relationships,
      walkways,
    } = this.props;
    return relationships.map((relationship, index) => {
      const base = bases[relationship.ID];
      const walkway = walkways[relationship.ID];
      switch (relationship.type) {
        case BoardEntities.BASE:
          return <Base baseID={base.ID} key={index} enabled={base.enabled} hasWon={base.hasWon} />;
        case BoardEntities.HOME:
          return <Home baseIDs={relationship.baseIDs} key={index} />;
        case BoardEntities.WALKWAY:
          return <Walkway walkway={walkway!} key={index} />;
        default:
          return null;
      }
    });
  }

  private startGame = async () => {
    try {

      socket.emit('startGame', this.state.room_code, (data: any) => {
        if (data.st) {
          this.setState({ showPlayerConfiguration: false, });
          this.setState({ isStarted: true });
          this.state.gameSound.pause();
          this.state.startSound.play();
        }
      })
    } catch (error) {
      this.setState({
        modelMessage: {
          headerMessage: `${error}`, paragraphMessage: '', spanMessage: '', other: ""
        }
      })
      getError()
    }
  }

}

export const Ludo = connect(mapStateToProps, mapDispatchToProps)(LudoBare) as unknown as React.ComponentClass<IPublicProps, IProps>;
