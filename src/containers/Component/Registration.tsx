import { useState } from "react";
import { useAccount } from 'wagmi'
import { SERVER_URL } from "../../env";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Registration() {

    const [name, setName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { address } = useAccount();
    const navigate = useNavigate();


    const registerUser = async () => {
        setIsLoading(true);
        try {
            if (name === '') {
                alert("enter name");
            }
            const data = {
                name: name,
                address: address
            }

            await axios.post(`${SERVER_URL}/user/create`, data).then((res) => {
                const data = res.data;

                if (data.st) {
                    localStorage.setItem('name', name);
                    localStorage.setItem('address', String(address));
                    navigate('/dashboard');
                } else {
                    alert('username already exist');
                }

            })
        } catch (error) {
            alert('error')
        }
        setIsLoading(false);
    }


    return (
        <section className='wallet-section'>
            <div className='container'>
                <div className='row justify-content-center' style={{ alignItems: 'center' }}>
                    <div style={{ maxWidth: '430px' }}>
                        <div className='round'></div>
                        <div className='wallet-box'>
                            <div style={{ padding: '0px 42px' }} className='box-width'>
                                <img src="./images/logo.png" className='wallete-logo' alt="" />
                                <h5 className='connected-wlt'>Enter your name</h5>
                                <div className="info-details mb-4">
                                    <div className="form-row bottom-margin-30">
                                        <div className="input-group form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder='Enter your name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div style={{ alignItems: 'center', textAlign: 'left', marginBottom: '30px' }}>
                                        <span className='step'>Step 03</span><span className='step-name'>Enter name for registration</span>
                                    </div>
                                    <div style={{ alignItems: 'center', textAlign: 'left' }}>
                                        <span className='step'>Step 04</span><span className='step-name'>click continue to enter game zone</span>
                                    </div>
                                </div>
                                <div className='wallet-btn mt-3'>
                                    <button
                                        type='button'
                                        className='connect-btn mb-0 w-100'
                                        disabled={isLoading}
                                        onClick={() => registerUser()}
                                    >
                                        {isLoading ? 'loading...' : 'continue'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}