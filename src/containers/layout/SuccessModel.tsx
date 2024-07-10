/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Message } from '../../containers/Pages/pageInterface';

interface IProps { modelMessage: Message; }

const SuccessModel: React.FC<IProps> = ({ modelMessage }) => {

    const closeModel = (e: any, msg: any) => {
        e.preventDefault();
        const modal = document.getElementById('SuccessModel');
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
            document.body.classList.remove('modal-open');
        }
        if (msg === "Lets Play..") {
            window.location.href = '/gameZone';
            return;
        }

        if (msg === "/gameZone") {
            sessionStorage.removeItem("store");
            window.location.href = '/gameZone';
            return;
        }

        if (msg === `ludo`) {
            window.location.href = `/ludo`;
            return;
        }
    }

    return (
        <div className="modal fade show" id="SuccessModel" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '405px' }}>
                <div className="modal-content" style={{ border: '3px solid #a94949' }}>
                    <div className="modal-header">
                        <h5 className="connected-wlt mb-0 pt-2" id="exampleModalCenterTitle">{modelMessage.headerMessage}</h5>
                    </div>
                    <div className="modal-body">
                        <img src='./images/sucessicon.png' className='sucessicon'></img>
                        <p className='mb-2'>{modelMessage.paragraphMessage}</p>
                        <span>{modelMessage.spanMessage} </span>
                    </div>
                    <div className="modal-footer pb-3">
                        <button type="button" className="back" onClick={e => closeModel(e, modelMessage.other)}>Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SuccessModel
