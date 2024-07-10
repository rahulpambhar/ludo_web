import { useAccount, } from 'wagmi';
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";

function Dashboardheader() {

    const { address } = useAccount();
    const navigate = useNavigate();

    return (
        <div>
            <div className='gameheader'>
                <nav className="navbar p-0">
                    <div className="container-fluid" style={{ justifyContent: 'space-around' }}>
                        <div className='row g-0 w-100' style={{ alignItems: 'center' }}>
                            <div className='col-lg-3 col-md-4'>
                                <a className="navbar-brand" href="#" style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="./images/player.png" className='player' alt="" />
                                    <p className='ply-name'>{localStorage.getItem('name')}</p>
                                </a>
                            </div>
                            <div className='col-lg-9 col-md-8'>
                                <form className="flt">
                                    <ul className='flex'>
                                        <li>
                                            <div className="info-details info-details1 brd">
                                                <div className="form-row">
                                                    <div className="input-group form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control border-radius" placeholder='1BoatSLRHtKNngkdXEobR76...'
                                                            value={address}
                                                            readOnly
                                                            style={{ background: '#061B4C', padding: '10px 20px' }} />
                                                        <CopyToClipboard text={String(address)} onCopy={() => {
                                                            setTimeout(() => {
                                                                if (address) {
                                                                    toast.success('address Copied');
                                                                }
                                                            });
                                                        }}>
                                                            <div className="input-group-append">
                                                                <button type="button" className="input-group-text cpy" style={{ background: '#A606A9', color: '#ffffff' }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                                                                        <path d="M9.33325 5.33325H2.66659C1.93125 5.33325 1.33325 5.93125 1.33325 6.66659V13.3333C1.33325 14.0686 1.93125 14.6666 2.66659 14.6666H9.33325C10.0686 14.6666 10.6666 14.0686 10.6666 13.3333V6.66659C10.6666 5.93125 10.0686 5.33325 9.33325 5.33325Z" fill="#ffffff" />
                                                                        <path d="M13.3333 1.33325H6.66659C6.31296 1.33325 5.97382 1.47373 5.72378 1.72378C5.47373 1.97382 5.33325 2.31296 5.33325 2.66659V3.99992H10.6666C11.0202 3.99992 11.3593 4.14039 11.6094 4.39044C11.8594 4.64049 11.9999 4.97963 11.9999 5.33325V10.6666H13.3333C13.6869 10.6666 14.026 10.5261 14.2761 10.2761C14.5261 10.026 14.6666 9.68687 14.6666 9.33325V2.66659C14.6666 2.31296 14.5261 1.97382 14.2761 1.72378C14.026 1.47373 13.6869 1.33325 13.3333 1.33325Z" fill="#ffffff" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </CopyToClipboard>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button type="button" className='setting-btn' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none">
                                                    <path d="M19.5582 15.7168C18.3903 15.7168 17.2965 16.1699 16.4684 16.998C15.6442 17.8262 15.1872 18.9199 15.1872 20.0879C15.1872 21.2559 15.6442 22.3496 16.4684 23.1777C17.2965 24.002 18.3903 24.459 19.5582 24.459C20.7262 24.459 21.82 24.002 22.6481 23.1777C23.4723 22.3496 23.9293 21.2559 23.9293 20.0879C23.9293 18.9199 23.4723 17.8262 22.6481 16.998C22.2436 16.5905 21.7622 16.2673 21.2317 16.0474C20.7013 15.8274 20.1325 15.715 19.5582 15.7168ZM35.6637 24.916L33.109 22.7324C33.2301 21.9902 33.2926 21.2324 33.2926 20.4785C33.2926 19.7246 33.2301 18.9629 33.109 18.2246L35.6637 16.041C35.8567 15.8758 35.9948 15.6558 36.0597 15.4102C36.1246 15.1645 36.1132 14.905 36.027 14.666L35.9918 14.5645C35.2888 12.5984 34.2353 10.776 32.8825 9.18555L32.8122 9.10352C32.6479 8.91036 32.4289 8.77151 32.1842 8.70526C31.9394 8.63902 31.6803 8.64849 31.4411 8.73242L28.2692 9.86133C27.0973 8.90039 25.7926 8.14258 24.3786 7.61523L23.7653 4.29883C23.719 4.04899 23.5978 3.81915 23.4178 3.63984C23.2378 3.46052 23.0075 3.34022 22.7575 3.29492L22.652 3.27539C20.6207 2.9082 18.4801 2.9082 16.4489 3.27539L16.3434 3.29492C16.0934 3.34022 15.8631 3.46052 15.6831 3.63984C15.5031 3.81915 15.3819 4.04899 15.3356 4.29883L14.7184 7.63086C13.3177 8.16241 12.0129 8.91838 10.8551 9.86914L7.65981 8.73242C7.42061 8.64782 7.16133 8.63801 6.91643 8.7043C6.67153 8.77058 6.45259 8.90982 6.28872 9.10352L6.2184 9.18555C4.86798 10.7777 3.81477 12.5996 3.10903 14.5645L3.07387 14.666C2.89809 15.1543 3.04262 15.7012 3.43715 16.041L6.02309 18.248C5.902 18.9824 5.8434 19.7324 5.8434 20.4746C5.8434 21.2246 5.902 21.9746 6.02309 22.7012L3.44497 24.9082C3.25198 25.0734 3.11386 25.2935 3.04897 25.5391C2.98407 25.7847 2.99548 26.0442 3.08168 26.2832L3.11684 26.3848C3.82387 28.3496 4.86684 30.166 6.22621 31.7637L6.29653 31.8457C6.4608 32.0389 6.67975 32.1777 6.9245 32.244C7.16926 32.3102 7.42835 32.3007 7.66762 32.2168L10.8629 31.0801C12.027 32.0371 13.3239 32.7949 14.7262 33.3184L15.3434 36.6504C15.3897 36.9002 15.5109 37.1301 15.6909 37.3094C15.8709 37.4887 16.1012 37.609 16.3512 37.6543L16.4567 37.6738C18.5079 38.043 20.6086 38.043 22.6598 37.6738L22.7653 37.6543C23.0153 37.609 23.2456 37.4887 23.4256 37.3094C23.6056 37.1301 23.7268 36.9002 23.7731 36.6504L24.3864 33.334C25.8004 32.8027 27.1051 32.0488 28.277 31.0879L31.4489 32.2168C31.6881 32.3014 31.9473 32.3112 32.1922 32.2449C32.4372 32.1786 32.6561 32.0394 32.82 31.8457L32.8903 31.7637C34.2497 30.1582 35.2926 28.3496 35.9997 26.3848L36.0348 26.2832C36.2028 25.7988 36.0582 25.2559 35.6637 24.916ZM19.5582 26.9551C15.7653 26.9551 12.6911 23.8809 12.6911 20.0879C12.6911 16.2949 15.7653 13.2207 19.5582 13.2207C23.3512 13.2207 26.4254 16.2949 26.4254 20.0879C26.4254 23.8809 23.3512 26.9551 19.5582 26.9551Z" fill="#A606A9" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className='setting-btn'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none">
                                                    <g clipPath="url(#clip0_263_34185)">
                                                        <path d="M25 31.6667C25.0003 32.5076 24.6826 33.3176 24.1108 33.9343C23.539 34.5509 22.7553 34.9286 21.9167 34.9917L21.6667 35H18.3333C17.4924 35.0003 16.6824 34.6827 16.0657 34.1108C15.4491 33.539 15.0714 32.7553 15.0083 31.9167L15 31.6667H25ZM20 3.33334C23.025 3.33329 25.9317 4.50817 28.107 6.61013C30.2824 8.7121 31.5563 11.5768 31.66 14.6L31.6667 15V21.2733L34.7033 27.3467C34.8359 27.6117 34.9022 27.9048 34.8966 28.2011C34.8911 28.4973 34.8138 28.7878 34.6714 29.0476C34.529 29.3075 34.3258 29.5289 34.0791 29.6931C33.8324 29.8572 33.5497 29.9591 33.255 29.99L33.0633 30H6.93666C6.64027 30.0001 6.34827 29.9283 6.08569 29.7908C5.82312 29.6533 5.59779 29.4542 5.42902 29.2106C5.26025 28.9669 5.15307 28.686 5.11667 28.3919C5.08026 28.0977 5.11572 27.7991 5.21999 27.5217L5.29666 27.3467L8.33333 21.2733V15C8.33333 11.9058 9.56249 8.93835 11.7504 6.75043C13.9383 4.56251 16.9058 3.33334 20 3.33334Z" fill="#A606A9" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_263_34185">
                                                            <rect width="40" height="40" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>

                    </div>
                </nav>
            </div>
            {/* offcanvas */}
            <div className="offcanvas offcanvas-end dash-offcanvas" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header border-color">
                    <h5 id="offcanvasRightLabel">Setting</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body p-0">
                    <div className='setting-tab mt-0 p-3'>
                        <ul>
                            <li>
                                <button type='button' className='tab-button board-radius' onClick={() => navigate('/Gameboard')}>
                                    <p>Board</p>
                                </button>
                            </li>
                            <li>
                                <button type='button' className='tab-button' onClick={() => navigate('/history')}>
                                    <p>History</p>
                                </button>
                            </li>
                            <li>
                                <button type='button' className='tab-button store-radius' onClick={() => navigate('/Gamestore')}>
                                    <p>Store</p>
                                </button>
                            </li>
                        </ul>

                    </div>
                    <div className='setting-tab mt-0 p-3'>
                        <ul>
                            <li style={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
                                <button type='button' className='tab-button board-radius'>
                                    <p>Sound</p>
                                </button>
                                <label className="switch">
                                    <input type="checkbox" id="sound" />
                                    <span className="slider"></span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className='setting-tab mt-0 p-3'>
                        <ul>
                            <li style={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
                                <button type='button' className='tab-button board-radius'>
                                    <p>Music</p>
                                </button>
                                <label className="switch">
                                    <input type="checkbox" id="music" />
                                    <span className="slider"></span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboardheader