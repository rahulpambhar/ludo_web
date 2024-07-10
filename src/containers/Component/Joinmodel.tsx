function Joinmodel() {
    const openPayment = () => {
        window.location.href = "/Payment";
    }
    return (
        <div>
            <div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '405px' }}>
                    <div className="modal-content">

                        <div className="modal-body">
                            <div className="form-row">
                                <h5 className='connected-wlt mt-5 mb-2'>Join room</h5>
                                <p className='join-txt'>To join Room, Enter Your Refference Code below</p>
                                <div className="input-group form-group">
                                    <input type="text" className="form-control" placeholder='Ie.ABC123' />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer pb-3">
                            <button type="button" className="back" onClick={openPayment}>Join room</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Joinmodel