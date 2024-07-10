/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from "axios"
import { SERVER_URL } from "../../env"
import { useAccount, } from 'wagmi'
import ErrorModel from '../layout/ErrorModel';
import SuccessModel from '../layout/SuccessModel'
import { Message } from '../Pages/pageInterface'
import { getError } from '../../containers/utils';
import { getSuccess } from '../../containers/utils';



type DataItem = {
    isPayment: boolean;
};

const CreateRoom: React.FC = () => {

    const [player, setPlayer] = useState("")

    const [isRoomCreat, setIsRoomCreat] = useState(false)
    const creator = localStorage.getItem("roomCreator");
    const roomName = localStorage.getItem("roomName");
    const joinersName = localStorage.getItem("joinersName");
    const colour: string | null = localStorage.getItem("colour") || "";
    const Game: string | null = localStorage.getItem("Game") || null;
    const { address, isConnected, } = useAccount()
    const [rommRefferalCode, setRoomReffeCode] = useState<string>("");
    const [modelMessage, setModalMessage] = useState<Message>({ headerMessage: '', paragraphMessage: '', spanMessage: '', other: "" });

    const doPayment = 10;
    const life = 3;


    const createRoom = async (e: any) => {
        e.preventDefault()
        try {
            const randomNumber = Math.floor(Math.random() * (999999 - 2 + 1)) + 100
            const playerName = `${player}-${randomNumber}`;
            const data = {
                address: address,
                gameStatus: false,
                roomStatus: true,
                game: Game,
                dises: {
                    RED: {
                        USER: playerName,
                        address: address,
                        isPayment: false,
                        Payment: 0,
                        walletBalance: 0,
                        isLeave: false,
                        life: life,
                    },
                    GREEN: {
                        USER: "",
                        isPayment: false,
                        Payment: 0,
                        walletBalance: 0,
                        isLeave: false,
                        life: life,
                    },
                    YELLOW: {
                        USER: "",
                        isPayment: false,
                        Payment: 0,
                        walletBalance: 0,
                        isLeave: false,
                        life: life,
                    },
                    BLUE: {
                        USER: "",
                        isPayment: false,
                        Payment: 0,
                        walletBalance: 0,
                        isLeave: false,
                        life: life,
                    }
                },
                winnersList: []
            }
            const res = await axios.post(`${SERVER_URL}/api/roomCreate`, data)
            if (res.data.st === true) {
                localStorage.setItem("roomCreator", playerName)
                localStorage.setItem("BASE", "BASE_3")
                localStorage.setItem("colour", "RED")
                localStorage.setItem("joinersName", player)
                // let song = new Audio(waitingGameSound);
                // song.play();   
                const newMessages: Message = {
                    headerMessage: 'Room created successfully!!  Do payment', paragraphMessage: '', spanMessage: '', other: '',
                };
                setModalMessage(newMessages);
                getSuccess()
                setIsRoomCreat(true)
            } else {
                const newMessages: Message = {
                    headerMessage: 'Something Wrong!', paragraphMessage: "", spanMessage: '', other: "",
                };
                setModalMessage(newMessages);
                getError()
            }
        } catch (error) {
            console.log('error->', error);
            const newMessages: Message = {
                headerMessage: '', paragraphMessage: "Catch Error", spanMessage: '', other: '',
            };
            setModalMessage(newMessages);
            getError()
        }
    }
    const JoinRoom = async (e: any) => {
        e.preventDefault()

        if (isConnected) {
            const requestData: AxiosRequestConfig = {
                params: {
                    address: address
                },
            };
            const player = await axios.get(`${SERVER_URL}/api/getPlayer`, requestData)

            if (player?.data?.data?.accountStatus === true && rommRefferalCode !== "") {

                try {
                    const requestData: AxiosRequestConfig = {
                        params: {
                            creator: rommRefferalCode,
                        },
                    };

                    await axios.get(`${SERVER_URL}/api/getRoom`, requestData).then((res) => {

                        if (res?.data?.st === true) {
                            if (res?.data?.data?.dises?.GREEN?.USER === "" && res?.data?.data?.gameStatus === false) {
                                const data = {
                                    joinersName: player.data.data.playerName,
                                    address: address,
                                    dise: "GREEN",
                                    rommRefferalCode: rommRefferalCode
                                }

                                axios.post(`${SERVER_URL}/api/roomJoiner`, data).then((res) => {

                                    if (res.data.st === true) {
                                        // socket.emit('joinroom', code)
                                        localStorage.setItem("joinersName", player.data.data.playerName)
                                        localStorage.setItem("roomName", rommRefferalCode)
                                        localStorage.setItem("BASE", "BASE_2")
                                        localStorage.setItem("colour", "GREEN")
                                        // let song = new Audio(waitingGameSound);
                                        // song.play();
                                        setIsRoomCreat(true)
                                        const newMessages: Message = {
                                            headerMessage: `${res?.data?.msg}`, paragraphMessage: '', spanMessage: '', other: "",
                                        };
                                        setModalMessage(newMessages);
                                        getSuccess()
                                    } else {
                                        const newMessages: Message = {
                                            headerMessage: 'something goes wrong!!', paragraphMessage: '', spanMessage: '', other: "",
                                        };
                                        setModalMessage(newMessages);
                                        getError()
                                    }
                                })

                                return;
                            } else if (res?.data?.data?.dises?.YELLOW?.USER === "" && res?.data?.data?.gameStatus === false) {
                                const data = {
                                    joinersName: player.data.data.playerName,
                                    address: address,
                                    dise: "YELLOW",
                                    rommRefferalCode: rommRefferalCode
                                }

                                axios.post(`${SERVER_URL}/api/roomJoiner`, data).then((res) => {
                                    if (res.data.st === true) {
                                        // socket.emit('joinroom', code)
                                        localStorage.setItem("joinersName", player.data.data.playerName)
                                        localStorage.setItem("roomName", rommRefferalCode)
                                        localStorage.setItem("BASE", "BASE_4")
                                        localStorage.setItem("colour", "YELLOW")
                                        // let song = new Audio(waitingGameSound);
                                        // song.play();
                                        setIsRoomCreat(true)
                                        const newMessages: Message = {
                                            headerMessage: 'Room Joined successfully', paragraphMessage: '', spanMessage: '', other: "",
                                        };
                                        setModalMessage(newMessages);
                                        getSuccess()
                                    } else {
                                        const newMessages: Message = {
                                            headerMessage: 'something goes wrong!!', paragraphMessage: '', spanMessage: '', other: "",
                                        };
                                        setModalMessage(newMessages);
                                        getError()
                                    }
                                })

                                return;
                            } else if (res?.data?.data?.dises?.BLUE?.USER === "" && res?.data?.data?.gameStatus === false) {
                                const data = {
                                    joinersName: player.data.data.playerName,
                                    address: address,
                                    dise: "BLUE",
                                    rommRefferalCode: rommRefferalCode
                                }

                                axios.post(`${SERVER_URL}/api/roomJoiner`, data).then((res) => {

                                    if (res.data.st === true) {
                                        // socket.emit('joinroom', code)
                                        localStorage.setItem("joinersName", player.data.data.playerName)
                                        localStorage.setItem("roomName", rommRefferalCode)
                                        localStorage.setItem("BASE", "BASE_1")
                                        localStorage.setItem("colour", "BLUE")
                                        // let song = new Audio(waitingGameSound);
                                        // song.play();
                                        setIsRoomCreat(true)
                                        const newMessages: Message = {
                                            headerMessage: 'Room Joined successfully', paragraphMessage: '', spanMessage: '', other: "",
                                        };
                                        setModalMessage(newMessages);
                                        getSuccess()
                                    } else {
                                        const newMessages: Message = {
                                            headerMessage: 'something goes wrong!!', paragraphMessage: '', spanMessage: '', other: "",
                                        };
                                        setModalMessage(newMessages);
                                        getError()
                                    }
                                })

                                return;
                            }
                            else {
                                if (res?.data?.data?.gameStatus === true) {
                                    const newMessages: Message = {
                                        headerMessage: 'You are late game already started..', paragraphMessage: '', spanMessage: '', other: "",
                                    };
                                    setModalMessage(newMessages);
                                    getError()
                                } else {
                                    const newMessages: Message = {
                                        headerMessage: 'Room is full!!', paragraphMessage: '', spanMessage: '', other: "",
                                    };
                                    setModalMessage(newMessages);
                                    getError()
                                }
                            }
                        } else {
                            const newMessages: Message = {
                                headerMessage: `${res?.data?.msg}`, paragraphMessage: '', spanMessage: '', other: "",
                            };
                            setModalMessage(newMessages);
                            getError()
                        }
                    })
                } catch (error) {
                    const newMessages: Message = {
                        headerMessage: `${error}`, paragraphMessage: '', spanMessage: '', other: "",
                    };
                    setModalMessage(newMessages);
                    getError()
                }
            } else {
                const newMessages: Message = {
                    headerMessage: "Please Enter Joining Code!!", paragraphMessage: '', spanMessage: '', other: "",
                };
                setModalMessage(newMessages);
                getError()
            }
        } else {
            const newMessages: Message = {
                headerMessage: "connect Wallet..", paragraphMessage: '', spanMessage: '', other: "",
            };
            setModalMessage(newMessages);
            getError()
        }
    }
    const canclePayment = async (e: any) => {
        e.preventDefault();
        try {
            if (creator !== null) {
                const requestData: AxiosRequestConfig = {
                    params: {
                        creator: creator, address: address
                    },
                };
                await axios.delete(`${SERVER_URL}/api/canclePayment`, requestData).then((res) => {
                    if (res.data.st === true) {
                        const newMessages: Message = {
                            headerMessage: `${res.data.msg}`, paragraphMessage: '', spanMessage: '', other: "/gameZone",
                        };
                        setModalMessage(newMessages);
                        getSuccess()

                        localStorage.removeItem("roomCreator")
                        localStorage.removeItem("BASE")
                        localStorage.removeItem("colour")
                        localStorage.removeItem("joinersName")
                        localStorage.removeItem("Game")
                    } else {
                        const newMessages: Message = {
                            headerMessage: 'something goes wrong!!', paragraphMessage: '', spanMessage: '', other: "",
                        };
                        setModalMessage(newMessages);
                        getError()
                    }
                })
            } else {
                const requestData: AxiosRequestConfig = {
                    params: {
                        roomName: roomName, address: address, colour: colour
                    },
                };
                await axios.delete(`${SERVER_URL}/api/canclePayment`, requestData).then((res) => {
                    if (res.data.st === true) {
                        const newMessages: Message = {
                            headerMessage: `${res.data.msg}`, paragraphMessage: '', spanMessage: '', other: "/gameZone",
                        };
                        setModalMessage(newMessages);
                        getSuccess()
                        localStorage.removeItem("roomCreator")
                        localStorage.removeItem("BASE")
                        localStorage.removeItem("colour")
                        localStorage.removeItem("joinersName")
                        localStorage.removeItem("Game")

                    } else {
                        const newMessages: Message = {
                            headerMessage: 'something goes wrong!!', paragraphMessage: '', spanMessage: '', other: "",
                        };
                        setModalMessage(newMessages);
                        getError()
                    }
                })
            }
        } catch (error) {
            const newMessages: Message = {
                headerMessage: `${error}`, paragraphMessage: '', spanMessage: '', other: "",
            };
            setModalMessage(newMessages);
            getError()
        }
    }

    const paymentSubmit = async (e: any) => {
        e.preventDefault()

        try {
            const requestData: AxiosRequestConfig = {
                params: { creator: creator || roomName },
            };

            const res = await axios.get(`${SERVER_URL}/api/getRoom`, requestData)
            const playersData: unknown[] = Object.values(res?.data?.data?.dises).filter((obj: any) => obj.USER === joinersName || creator);
            const typedData = playersData as DataItem[];

            if (typedData[0]?.isPayment === true) {
                window.location.href = `/${Game}`;
            } else {
                const requestPaymentData: AxiosRequestConfig = {
                    params: { roomCreator: creator || roomName, joinersName: joinersName, colour: colour, amount: doPayment, roomWallet: (doPayment + res?.data?.data?.roomWallet), address: address, Game: Game },
                };
                await axios.post(`${SERVER_URL}/api/payment`, requestPaymentData).then((result) => {
                    if (result?.data?.st === true) {
                        const newMessages: Message = {
                            headerMessage: `${result.data.msg}`, paragraphMessage: '', spanMessage: '', other: `${Game}`
                        };
                        setModalMessage(newMessages);
                        getSuccess()
                    }
                    else {
                        const newMessages: Message = {
                            headerMessage: `${result.data.msg}`, paragraphMessage: '', spanMessage: '', other: ``
                        };
                        setModalMessage(newMessages);
                        getError()

                    }
                })
            }

        } catch (error) {
            const newMessages: Message = {
                headerMessage: `${error}`, paragraphMessage: '', spanMessage: '', other: "",
            };
            setModalMessage(newMessages);
            getError()
        }
    }

    useEffect(() => {
        const isPlayerRegistered = async () => {
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
                    } else {

                        if (Game === "ludo") {
                            setPlayer(player?.data?.data?.playerName)

                            if (creator !== null) {
                                const requestData: AxiosRequestConfig = {
                                    params: {
                                        creator: creator
                                    },
                                };
                                const getRoom = await axios.get(`${SERVER_URL}/api/getRoom`, requestData)
                                if (getRoom?.data?.data?.dises?.[colour]?.isPayment === false) {
                                    setIsRoomCreat(true)
                                    return;
                                } else {
                                    if (player.data.data.isAnyRoomOpen === Game) {
                                        window.location.href = '/ludo';
                                        return;
                                    }
                                    setIsRoomCreat(false)
                                    return;
                                }
                            } else {
                                const requestData: AxiosRequestConfig = {
                                    params: {
                                        creator: roomName
                                    },
                                };
                                const getRoom = await axios.get(`${SERVER_URL}/api/getRoom`, requestData)
                                if (getRoom?.data?.data?.dises?.[colour]?.isPayment === false) {
                                    setIsRoomCreat(true)
                                    return;
                                } else {
                                    if (player.data.data.isAnyRoomOpen === Game) {
                                        window.location.href = '/ludo';
                                        return;
                                    }
                                    setIsRoomCreat(false)
                                    return;
                                }
                            }
                        }
                    }
                } else {
                    const newMessages: Message = {
                        paragraphMessage: 'connect wallet First..', headerMessage: "", spanMessage: '', other: "connect wallet First..",
                    };
                    setModalMessage(newMessages);
                    getError()
                }
            } catch (error) {
                const newMessages: Message = {
                    paragraphMessage: `${error}`, headerMessage: "", spanMessage: '', other: "",
                };
                setModalMessage(newMessages);
                getError()
            }
        }
        isPlayerRegistered()
    }, [isConnected])
    return (
        <>
            <div>
                <ErrorModel modelMessage={modelMessage} />
                <SuccessModel modelMessage={modelMessage} />
                {
                    isConnected ?
                        <div>
                            {
                                isRoomCreat ?
                                    <section className='wallet-section'>
                                        <div className='container'>
                                            <div className='row justify-content-center' style={{ alignItems: 'center' }}>
                                                <div style={{ maxWidth: '430px' }}>
                                                    <div className='round'></div>
                                                    <div className='wallet-box'>
                                                        <div style={{ padding: '0px 42px' }} className='box-width'>
                                                            <img src="./images/logo.png" className='wallete-logo' alt=""></img>
                                                            <h5 className='connected-wlt'></h5>
                                                            <div className="info-details mb-3">

                                                                <div className="form-row bottom-margin-30 mb-4">
                                                                    <label style={{ textAlign: 'left', float: 'left' }}>Entry Fee</label>

                                                                    <div className="input-group form-group">
                                                                        <input type="text" className="form-control" value={doPayment} />
                                                                        {/* <div className="input-group-append">
                                                                            <button type="button" className="input-group-text join-btn" onClick={e => paymentSubmit(e)}>
                                                                                Pay
                                                                            </button>
                                                                        </div> */}
                                                                    </div>
                                                                </div>


                                                            </div>
                                                            <div className='wallet-btn mt-0 row mb-4'>
                                                                <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                                                    <button type='button' className='connect-btn join-btn mb-0 bottom-margin-15 w-100' onClick={e => paymentSubmit(e)}> Pay</button>
                                                                </div>
                                                            </div>
                                                            <p className='join-txt'>*Cancle payment will Delete your room</p>
                                                            <div className='wallet-btn mt-0 mb-4 row'>
                                                                <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                                                    <button type='button' className='connect-btn mb-0 bottom-margin-15 w-100' onClick={e => canclePayment(e)}>Cancle Payment</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    :
                                    <section className='wallet-section'>
                                        <div className='container'>
                                            <div className='row justify-content-center' style={{ alignItems: 'center' }}>
                                                <div style={{ maxWidth: '430px' }}>
                                                    <div className='round'></div>
                                                    <div className='wallet-box'>
                                                        <div style={{ padding: '0px 42px' }} className='box-width'>
                                                            <img src="./images/logo.png" className='wallete-logo' alt=""></img>
                                                            {/* <h5 className='connected-wlt'>connected wallet</h5> */}
                                                            <div className="info-details mb-4">
                                                                {/* <div className="form-row bottom-margin-30">
                                                                    <div className="input-group form-group">
                                                                        <input type="text" className="form-control" placeholder='1BoatSLRHtKNngkdXEobR76...' />
                                                                        <div className="input-group-append">
                                                                            <button type="button" className="input-group-text">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                                                                                    <path d="M9.33325 5.33325H2.66659C1.93125 5.33325 1.33325 5.93125 1.33325 6.66659V13.3333C1.33325 14.0686 1.93125 14.6666 2.66659 14.6666H9.33325C10.0686 14.6666 10.6666 14.0686 10.6666 13.3333V6.66659C10.6666 5.93125 10.0686 5.33325 9.33325 5.33325Z" fill="#A606A9" />
                                                                                    <path d="M13.3333 1.33325H6.66659C6.31296 1.33325 5.97382 1.47373 5.72378 1.72378C5.47373 1.97382 5.33325 2.31296 5.33325 2.66659V3.99992H10.6666C11.0202 3.99992 11.3593 4.14039 11.6094 4.39044C11.8594 4.64049 11.9999 4.97963 11.9999 5.33325V10.6666H13.3333C13.6869 10.6666 14.026 10.5261 14.2761 10.2761C14.5261 10.026 14.6666 9.68687 14.6666 9.33325V2.66659C14.6666 2.31296 14.5261 1.97382 14.2761 1.72378C14.026 1.47373 13.6869 1.33325 13.3333 1.33325Z" fill="#A606A9" />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div> */}
                                                                <div className="form-row bottom-margin-30 mb-4">
                                                                    <h5 className='connected-wlt mb-4'>Join room</h5>
                                                                    <p className='join-txt'>To join Room, Enter Your Refference Code below</p>
                                                                    <div className="input-group form-group">
                                                                        <input type="text" value={rommRefferalCode}
                                                                            onChange={e => setRoomReffeCode(e.target.value)} className="form-control" placeholder='Ie.ABC123' />
                                                                        {/* <div className="input-group-append">
                                                                            <button type="button"  className="input-group-text join-btn">
                                                                                join
                                                                            </button>
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='wallet-btn mt-0 mb-4'>
                                                                <button type='button' onClick={(e) => JoinRoom(e)} className='connect-btn mb-0 w-100'> join room</button>
                                                            </div>
                                                            <div className='wallet-btn mt-0 mb-4'>
                                                                <button type='button' onClick={e => createRoom(e)} className='connect-btn mb-0 w-100'>Create room</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                            }

                        </div>
                        : ((window.location.href = '/'))
                }
            </div>
        </>
    );
};

export default CreateRoom;
