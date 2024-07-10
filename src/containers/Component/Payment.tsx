function Payment() {
    const openLudo = () => {
        window.location.href = "/Ludo";
    }
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
                                    <div className="info-details mb-3">
                                        <div className="form-row bottom-margin-30">
                                            <label style={{ textAlign: 'left', float: 'left' }}>Entry Fee</label>

                                            <div className="input-group form-group">
                                                <input type="text" className="form-control" placeholder='10' />
                                            </div>
                                            <div className='wallet-btn mt-4 mb-4 row'>
                                                <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                                    <button type='button' className='connect-btn mb-0  w-100' onClick={openLudo}>payment</button>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='join-txt'>*Cancle payment will Delete your room</p>
                                    </div>
                                    <div className='wallet-btn mt-3 mb-4 row'>
                                        <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                            <button type='button' className='connect-btn mb-0 bottom-margin-15 w-100'>Cancel payment</button>
                                        </div>
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

export default Payment