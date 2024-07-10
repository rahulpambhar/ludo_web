/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios'
import { SERVER_URL } from "../../env"
// import waitingGameSound from "../../sound/ludo_Waiting_sound.mp3.mp3"
import { useAccount, useConnect } from 'wagmi'
import ErrorModel from '../layout/ErrorModel';
import SuccessModel from '../layout/SuccessModel'
import { Message } from '../Pages/pageInterface'
import { getError } from '../../containers/utils';
import { getSuccess } from '../../containers/utils';
// import { InjectedConnector } from 'wagmi/connectors/injected'

const NewRegistration: React.FC = () => {

    const [newPlayer, setNewPlayer] = useState<string>("");
    const [modelMessage, setModalMessage] = useState<Message>({ headerMessage: '', paragraphMessage: '', spanMessage: '', other: "" });
    const { address, isConnected, } = useAccount()

    const { connect, connectors } = useConnect({
        chainId: 1,
        // onSuccess(data: any) {
        //     console.log('data::: ', data);
        // },
    });

    const createNewPlayer = async (e: any) => {
        e.preventDefault()
        try {
            const data = {
                playerName: newPlayer,
                address: address,
                walletBalance: 0,
                accountStatus: true,
                isAnyRoomOpen: "",
                lastPlyedRoom: "",
            }

            await axios.post(`${SERVER_URL}/api/newPlayer`, data).then((res) => {
                if (res.data.st === true) {
                    const newMessages: Message = {
                        headerMessage: 'Registered successfully!!', paragraphMessage: 'Lets Play..', spanMessage: '', other: "Lets Play..",
                    };
                    setModalMessage(newMessages);
                    getSuccess()
                    // let song = new Audio(waitingGameSound);
                    // song.play();
                    setNewPlayer("")
                } else {
                    const newMessages: Message = {
                        headerMessage: 'something goes wrong!!', paragraphMessage: '', spanMessage: '', other: '',
                    };
                    setModalMessage(newMessages);
                    getError()
                }
            })
        } catch (error) {
            console.log('error::: ', error);
            const newMessages: Message = {
                headerMessage: '', paragraphMessage: "Catch Error", spanMessage: '', other: '',
            };
            setModalMessage(newMessages);
            getError()
        }
    }

    useEffect(() => {
        if (!isConnected) {
            const newMessages: Message = {
                paragraphMessage: 'connect wallet First..', headerMessage: "", spanMessage: '', other: "connect wallet First..",
            };
            setModalMessage(newMessages);
            getError()
        }

        const isPlayerRegistered = async () => {
            try {
                if (isConnected) {
                    const requestData: AxiosRequestConfig = {
                        params: {
                            address: address
                        },
                    };
                    const player = await axios.get(`${SERVER_URL}/api/getPlayer`, requestData)
                    if (player?.data?.st) {
                        window.location.href = '/gameZone';
                    } else {
                        const newMessages: Message = {
                            headerMessage: 'Wel come', paragraphMessage: 'Register First!', spanMessage: 'Registration Is Mandatory for Play Game.', other: "",
                        };
                        setModalMessage(newMessages);
                        getError()
                    }
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
    }, [isConnected, address])

    return (
        <section className='wallet-section'>
            <div className='container'>
                <div className='row justify-content-center' style={{ alignItems: 'center' }}>
                    <ErrorModel modelMessage={modelMessage} />
                    <SuccessModel modelMessage={modelMessage} />
                    <div style={{ maxWidth: '430px' }}>
                        <div className='round'></div>
                        <div className='wallet-box'>

                            <div style={{ padding: '0px 42px' }} className='box-width'>
                                <img src="./images/logo.png" className='wallete-logo' alt=""></img>
                                <h5 className='connected-wlt'>Enter your name</h5>
                                <div className="info-details mb-4">
                                    <div className="form-row bottom-margin-30">
                                        <div className="input-group form-group">
                                            <input type="text" className="form-control" value={newPlayer} onChange={e => {
                                                if (isConnected) {
                                                    setNewPlayer(e.target.value)
                                                } else {
                                                    const newMessages: Message = {
                                                        headerMessage: 'please connect Wallet First..', paragraphMessage: "", spanMessage: '.', other: '',
                                                    };

                                                    setModalMessage(newMessages);
                                                    const modal = document.getElementById('ErrorModel');
                                                    if (modal) {
                                                        modal.style.display = 'block';
                                                        modal.classList.add('show');
                                                        document.body.classList.add('modal-open');
                                                    }
                                                }
                                            }
                                            } />
                                        </div>
                                    </div>
                                    <div style={{ alignItems: 'center', textAlign: 'left', marginBottom: '30px' }}>
                                        <span className='step'>Step 03</span><span className='step-name'>Enter name for registration</span>
                                    </div>
                                    <div style={{ alignItems: 'center', textAlign: 'left' }}>
                                        <span className='step'>Step 04</span><span className='step-name'>click continue to enter game zone</span>
                                    </div>
                                </div>
                                {
                                    isConnected ?
                                        <div className='wallet-btn mt-3'>
                                            <button type='button' className='connect-btn mb-0 w-100' onClick={(e) => createNewPlayer(e)}>continue</button>
                                        </div>
                                        :
                                        (
                                            connectors.map((connector) => (
                                                <div className='wallet-btn mt-3' key={connector.id}>
                                                    <button type='button' className='connect-btn w-100' onClick={() => connect({ connector })}>Connect wallet</button>
                                                </div>
                                            ))
                                        )
                                }
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>

    );
};




export default NewRegistration;
