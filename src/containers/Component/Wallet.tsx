import axios from "axios";
import { useCallback, useEffect } from "react";
import { useConnect, useAccount, } from 'wagmi'
import { SERVER_URL } from "../../env";
import { useNavigate } from "react-router-dom";

function Wallet() {

    const { connect, connectors, isLoading, pendingConnector } = useConnect();
    const { address, isConnected } = useAccount();
    const navigate = useNavigate();

    const getUser = useCallback(async () => {
        if (isConnected) {
            const request = await axios.post(`${SERVER_URL}/user`, { address: address });
            if (request.data.st) {
                const user = request.data.data;
                if (user) {
                    localStorage.setItem('name', user.name);
                    localStorage.setItem('address', String(address));
                    navigate('/dashboard');
                } else {
                    navigate('/registration');
                }
            } else {
                alert(JSON.stringify(request.data));
            }
        }
    }, [address, isConnected, navigate])

    useEffect(() => {
        if (isConnected) {
            getUser();
        }
    }, [getUser, isConnected])

    return (
        <div>
            <section className='wallet-section'>
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
                                        {connectors.map((connector) => (
                                            <div key={connector.id}>
                                                <button
                                                    type='button'
                                                    className='connect-btn w-100 mt-4'
                                                    onClick={() => {
                                                        connect({ connector, chainId: 56 });
                                                    }}>
                                                    {isLoading && pendingConnector?.id === connector.id ? " (connecting)" : connector.name}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Wallet