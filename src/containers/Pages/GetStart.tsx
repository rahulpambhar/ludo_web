/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useConnect, useAccount, } from 'wagmi'
import { useDispatch } from 'react-redux';
import { getAddress } from '../Ludo/state/actions';
import axios, { AxiosRequestConfig } from 'axios'
import { SERVER_URL } from "../../env"
import ErrorModel from '../layout/ErrorModel';
import SuccessModel from '../layout/SuccessModel'
import { Message } from '../Pages/pageInterface'
import { getError } from '../../containers/utils';



const Getstart = () => {
    const Game: string | null = localStorage.getItem("Game") || null;
    const { address, isConnected, } = useAccount()
    const [modelMessage, setModalMessage] = useState<Message>({ headerMessage: '', paragraphMessage: '', spanMessage: '', other: "" });



    const getStart = async (e: any) => {
        e.preventDefault()

        try {
            if (isConnected) {
                const requestData: AxiosRequestConfig = {
                    params: {
                        address: address
                    },
                };
                const player = await axios.get(`${SERVER_URL}/api/getPlayer`, requestData)
                if (!player?.data?.st) {
                    window.location.href = '/newRegistration';
                    return;
                }

                if (player.data.data.isAnyRoomOpen === Game && Game !== null) {
                    window.location.href = `/${Game}`;
                    return;
                }
                window.location.href = '/gameZone';
            }
        } catch (error) {
            const newMessages: Message = {
                paragraphMessage: "", headerMessage: "Catch Error", spanMessage: '', other: "Access denied!!",
            };
            setModalMessage(newMessages);
            getError()
        }

    }

    const dispatch = useDispatch();
    const handleDispatchAddress = () => {
        const formattedAddress: string = `${address}`;
        localStorage.setItem("add", formattedAddress);
        if (address)
            dispatch(getAddress(address));
    };

    useEffect(() => {
        if (!isConnected) {
            const newMessages: Message = {
                paragraphMessage: 'connect wallet First..', headerMessage: "", spanMessage: '', other: "",
            };
            setModalMessage(newMessages);
            getError()
        }
        handleDispatchAddress()
    }, [])

    const { connect, connectors } = useConnect({
        chainId: 1,
        // onSuccess(data: any) {
        //     console.log('data::: ', data);
        // },
    });

    return (
        <>
            <section className='wallet-section'>
                <ErrorModel modelMessage={modelMessage} />
                <SuccessModel modelMessage={modelMessage} />
                <div className='container'>
                    <div className='row justify-content-center' style={{ alignItems: 'center' }}>
                        <div style={{ maxWidth: '430px' }}>
                            <div className='round'></div>
                            <div className='wallet-box'>
                                <div style={{ padding: '0px 42px' }} className='box-width'>
                                    <img src="./images/logo.png" className='wallete-logo' alt=""></img>
                                    <h1 className='welcome'>welcome</h1>
                                    <p> Connect wallet<br />
                                        To play more fun with crypto games</p>

                                    <div className='wallet-btn'>
                                        {isConnected ? <button type='button' className='connect-btn mb-0 w-100' onClick={(e) => getStart(e)}>Get started</button>
                                            : (
                                                connectors.map((connector) => (
                                                    <button type='button' className='connect-btn w-100' onClick={() => connect({ connector })}>Connect wallet</button>
                                                ))
                                            )}
                                    </div>

                                </div>
                                <div className="form-group form-check position-relative w-100 bottom-margin-30" style={{ float: 'left', padding: '0px 15px 0px 15px' }}>
                                    <input type="checkbox" className="form-check-input ml-0" id="exampleCheck1" />
                                    <label className="form-check-label">I agree to your Terms of Service & Privacy policy</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Getstart;
