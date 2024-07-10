import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../env";


function Joinroom() {

    const navigate = useNavigate();

    const [walletModal, handleWalletModal] = useState(false);
    const [roomCode, setRoomCode] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const joinRoom = async () => {
        setIsLoading(true);
        try {
            const request = await axios.post(`${SERVER_URL}/room`, { roomCode: roomCode });
            if (request.data.st) {
                const room = request.data.data;
                if (room && !room?.isStarted) {
                    localStorage.setItem('room_code', roomCode);
                    navigate('/ludo');
                } else if (room?.isStarted) {
                    alert("game already started");
                    setRoomCode("")
                }else{
                    alert("Invalid code")
                }
            } else {
                alert("invalid room code");
            }
        } catch (err) {
            console.log('err::: ', err);
            alert('err');
        }
        setIsLoading(false);
    }

    const createRoom = async () => {
        setIsLoading(true);
        try {
            const data = {
                name: localStorage.getItem('name'),
                address: localStorage.getItem('address')
            }

            await axios.post(`${SERVER_URL}/room/create`, data).then((res) => {
                const data = res.data;
                if (data.st) {
                    localStorage.setItem('room_code', data.data.roomCode);
                    navigate('/ludo');
                } else {
                    alert('error');
                }
            })
        } catch (error) {
            alert('error')
        }
        setIsLoading(false);
    }

    return (
        <>
            <section className='wallet-section'>
                <div className='container'>
                    <div className='row justify-content-center' style={{ alignItems: 'center' }}>
                        <div style={{ maxWidth: '430px' }}>
                            <div className='round'></div>
                            <div className='wallet-box'>
                                <div style={{ padding: '0px 42px' }} className='box-width'>
                                    <img src="./images/logo.png" className='wallete-logo' alt="" />
                                    <div className='wallet-btn mt-2 mb-4'>
                                        <button type='button' className='connect-btn mb-0 w-100' onClick={() => {
                                            handleWalletModal(true);
                                        }}> join room</button>
                                    </div>
                                    <div className='wallet-btn mt-2 mb-5'>
                                        <button
                                            type='button'
                                            className='connect-btn mb-0 w-100'
                                            onClick={() => createRoom()}
                                            disabled={isLoading}>
                                            Create room
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className={`modal ${walletModal ? "show" : ""}`} id="myModal" style={{ display: `${walletModal ? "block" : "none"}`, }}>
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '405px' }}>
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="form-row">
                                <button type="button" className="btn"
                                    style={{ backgroundColor: '#a606a9' }}
                                    onClick={() => handleWalletModal(false)}
                                ><span aria-hidden="true">&times;</span></button>
                                <h5 className='connected-wlt mt-5 mb-2'>Join room</h5>
                                <p className='join-txt'>To join Room, Enter Your Refference Code below</p>
                                <div className="input-group form-group">
                                    <input type="text" className="form-control" placeholder='Ie.ABC123' value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer pb-3">
                            <button type="button" className="back" onClick={() => joinRoom()}>Join room</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Joinroom