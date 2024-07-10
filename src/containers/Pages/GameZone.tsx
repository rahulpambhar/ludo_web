/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios'
import { SERVER_URL } from "../../env"

import { useAccount, } from 'wagmi'
import HeaderGameZone from "../layout/headerGameZone"
import ErrorModel from '../layout/ErrorModel';
import SuccessModel from '../layout/SuccessModel'
import { Message } from '../Pages/pageInterface'
import { getError } from '../../containers/utils';
// import { getSuccess } from '../../containers/utils';


const GameZone: React.FC = () => {
    const Game: string | null = localStorage.getItem("Game") || null;
    const [modelMessage, setModalMessage] = useState<Message>({ headerMessage: '', paragraphMessage: '', spanMessage: '', other: "" });
    const { address, isConnected, } = useAccount()

    const playLudo = (e: any, game: string) => {
        e.preventDefault();
        localStorage.setItem('Game', game.toString());
        // window.location.href = '/createRoom';
        window.location.href = '/Dashboard';

    }

    useEffect(() => {
        console.log(' ::: ',  );
        const isPlayerRegistered = async () => {
            try {
                if (isConnected) {
                    console.log('isConnected::: ', isConnected);
                    const requestData: AxiosRequestConfig = {
                        params: {
                            address: address
                        },
                    };
                    const player = await axios.get(`${SERVER_URL}/api/getPlayer`, requestData)
                    console.log('player::: ', player);

                    if (!player?.data?.st) {
                        window.location.href = '/newRegistration';
                        return;
                    }

                    if (player.data.data.isAnyRoomOpen !== "" && Game == null) {
                        const newMessages: Message = {
                            paragraphMessage: 'Access denied!!', headerMessage: `${player.data.data.playerName} is Already Playing ${player.data.data.isAnyRoomOpen}`, spanMessage: '', other: "Access denied!!",
                        };
                        setModalMessage(newMessages);
                        getError()
                        return;
                    }

                    if (player.data.data.isAnyRoomOpen === Game && Game !== null) {
                        window.location.href = `/${Game}`;
                        return;
                    }
                } else {
                    const newMessages: Message = {
                        paragraphMessage: 'connect wallet First..', headerMessage: "", spanMessage: '', other: "connect wallet First..",
                    };
                    setModalMessage(newMessages);
                    getError()

                }
            } catch (error) {
                console.log('error::: ', error);
                const newMessages: Message = {
                    headerMessage: '', paragraphMessage: "Catch Error", spanMessage: '', other: "",
                };
                setModalMessage(newMessages);
                getError()
            }
        }
        isPlayerRegistered()
    }, [isConnected, address, Game])

    return (
        <>
            <HeaderGameZone />
            <ErrorModel modelMessage={modelMessage} />
            <SuccessModel modelMessage={modelMessage} />
            <div>
                {
                    isConnected ?
                        <section className='gamezoon'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-lg-6 col-md-12 col-sm-12 col-xl-6 col-xxl-6'>
                                        <div className='multiline-game'>
                                            <button type='button' aria-label="btn" className='game-img'>
                                                <img src="./images/ludo-img.png" alt="" />
                                            </button>
                                            <div className='wallet-btn mt-0 row mar-bottom' style={{ justifyContent: 'center' }}>
                                                <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
                                                    <button type='button' className='connect-btn mb-0 bottom-margin-15 w-100' onClick={e => playLudo(e, "ludo")}>Play Now</button>
                                                </div>
                                                {/* <div className='col-lg-6 col-md-6 col-sm-12 col-6'>
                                                    <button type='button' className='connect-btn mb-0 bottom-margin-15 w-100'>Back</button>
                                                </div> */}
                                            </div>

                                            <div className='inning'>
                                                <div className='row g-0' style={{ alignItems: 'center' }}>
                                                    <div className='col-lg-3 col-md-3'>
                                                        <div className='inning-count'>
                                                            <div className='digit'>11</div>
                                                            <p className='inningpara'>all the innings</p>
                                                            <h6 className='won'>you won</h6>
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6' >
                                                        <div className='inning-count mar-top'>
                                                            <div className='text-inning'>
                                                                20
                                                            </div>
                                                            <p className='inningpara'>all the games</p>
                                                            <div className='totalplay'>Total <span style={{ color: '#A606A9' }}>play</span> </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-3 col-md-3'>
                                                        <div className='inning-count'>
                                                            <div className='digit'>09</div>
                                                            <p className='inningpara'>all the innings</p>
                                                            <h6 className='won'>you Lost</h6>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12 col-xl-6 col-xxl-6'>
                                        <div className='multiline-game p-0'>
                                            <div className='history-header'>
                                                <div className='title-header'>
                                                    Game History
                                                </div>
                                            </div>
                                            <div className='game-details scrolling mt-2'>
                                                <div className='full-date'>Aug 01,2023</div>
                                                <div className='details-box'>
                                                    <h6 className='won'>you won</h6>
                                                    <div className='row g-0'>
                                                        <div className='col-lg-8 col-md-9 col-xl-8 col-xxl-8 col-sm-12'>
                                                            <div className='won-details'>
                                                                <ul>
                                                                    <li>
                                                                        <span>Aug 01,2023</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>Table ID: 45678789</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className='won-details'>
                                                                <ul>
                                                                    <li>
                                                                        <span>Entry Fee:  10 coin </span>
                                                                    </li>
                                                                    <li>
                                                                        <span>6 mins</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>2 Players</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-4 col-md-3 col-xl-4 col-xxl-4 col-sm-12'>
                                                            <div className='coin'>
                                                                + 20 coin
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='details-box'>
                                                    <h6 className='won' style={{ color: '#A606A9' }}>you Lost</h6>
                                                    <div className='row g-0'>
                                                        <div className='col-lg-8 col-md-9 col-xl-8 col-xxl-8 col-sm-12'>
                                                            <div className='won-details'>
                                                                <ul>
                                                                    <li>
                                                                        <span>Aug 01,2023</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>Table ID: 45678789</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className='won-details'>
                                                                <ul>
                                                                    <li>
                                                                        <span>Entry Fee:  10 coin </span>
                                                                    </li>
                                                                    <li>
                                                                        <span>6 mins</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>2 Players</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-4 col-md-3 col-xl-4 col-xxl-4 col-sm-12'>
                                                            <div className='coin' style={{ color: '#A606A9' }}>
                                                                - 10 coin
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='details-box'>
                                                    <h6 className='won'>you won</h6>
                                                    <div className='row g-0'>
                                                        <div className='col-lg-8 col-md-9 col-xl-8 col-xxl-8 col-sm-12'>
                                                            <div className='won-details'>
                                                                <ul>
                                                                    <li>
                                                                        <span>Aug 01,2023</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>Table ID: 45678789</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className='won-details'>
                                                                <ul>
                                                                    <li>
                                                                        <span>Entry Fee:  10 coin </span>
                                                                    </li>
                                                                    <li>
                                                                        <span>6 mins</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>2 Players</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-4 col-md-3 col-xl-4 col-xxl-4 col-sm-12'>
                                                            <div className='coin'>
                                                                + 20 coin
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='details-box'>
                                                    <h6 className='won'>you won</h6>
                                                    <div className='row g-0'>
                                                        <div className='col-lg-8 col-md-9 col-xl-8 col-xxl-8 col-sm-12'>
                                                            <div className='won-details'>
                                                                <ul>
                                                                    <li>
                                                                        <span>Aug 01,2023</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>Table ID: 45678789</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className='won-details'>
                                                                <ul>
                                                                    <li>
                                                                        <span>Entry Fee:  10 coin </span>
                                                                    </li>
                                                                    <li>
                                                                        <span>6 mins</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>2 Players</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-4 col-md-3 col-xl-4 col-xxl-4 col-sm-12'>
                                                            <div className='coin'>
                                                                + 20 coin
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='details-box'>
                                                    <h6 className='won'>you won</h6>
                                                    <div className='row g-0'>
                                                        <div className='col-lg-8 col-md-9 col-xl-8 col-xxl-8 col-sm-12'>
                                                            <div className='won-details'>
                                                                <ul>
                                                                    <li>
                                                                        <span>Aug 01,2023</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>Table ID: 45678789</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className='won-details'>
                                                                <ul>
                                                                    <li>
                                                                        <span>Entry Fee:  10 coin </span>
                                                                    </li>
                                                                    <li>
                                                                        <span>6 mins</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>2 Players</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-4 col-md-3 col-xl-4 col-xxl-4 col-sm-12'>
                                                            <div className='coin'>
                                                                + 20 coin
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='history-footer'>
                                                <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                                                    <div id="pagination">
                                                        <div className="pagination-list">
                                                            <nav aria-label="Page navigation example">
                                                                <ul className="pagination justify-content-center">
                                                                    <a className="page-link"
                                                                        href="#"
                                                                        data-ci-pagination-page="0">
                                                                        <li className="page-item"><i className="fa fa-angle-double-left"
                                                                            aria-hidden="true"></i> Prev</li>
                                                                    </a>
                                                                    <li className="page-item"><a className="page-link"
                                                                        href="#"
                                                                        data-ci-pagination-page="0">1</a></li>
                                                                    <li className="page-item page-link current">2</li>
                                                                    <li className="page-item"><a className="page-link"
                                                                        href="#"
                                                                        data-ci-pagination-page="48">3</a></li>
                                                                    <li className="page-item"><a className="page-link"
                                                                        href="#"
                                                                        data-ci-pagination-page="72">4</a></li>
                                                                    <a className="page-link"
                                                                        href="#"
                                                                        data-ci-pagination-page="48">
                                                                        <li className="page-item">Next <i className="fa fa-angle-double-right"
                                                                            aria-hidden="true"></i></li>
                                                                    </a>
                                                                </ul>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>
                        : ""
                }
            </div>

        </>
    );
};

export default GameZone;
