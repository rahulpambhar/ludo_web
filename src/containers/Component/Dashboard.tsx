import Dashboardheader from './Dashboardheader';
function Dashboard() {
    const openJoinroom = () => {
        window.location.href = "/joinroom";
    }

    return (
        <div>
            <Dashboardheader />
            <section className='gamezoon'>
                <div className='container'>
                    <div className='row' style={{ justifyContent: 'center' }}>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-xl-6 col-xxl-6'>
                            <div className='multiline-game'>
                                <div className='multilinelogo mar-bottom'>
                                    <img src="./images/logo.png" alt=""></img>
                                </div>
                                {/* <button type='button' className='game-img'> */}

                                {/* </button> */}


                                <div className='inning'>
                                    <div className='row g-0' style={{ alignItems: 'center' }}>
                                        <div className='col-lg-3 col-md-3'>
                                            <div className='inning-count'>
                                                <div className='digit'>11</div>
                                                <p className='inningpara'>all the innings</p>
                                                <h6 className='won'>you won</h6>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6' >
                                            <div className='inning-count mar-top'>
                                                <div className='text-inning'>
                                                    20
                                                </div>
                                                <p className='inningpara'>all the games</p>
                                                <div className='totalplay'>Total <span style={{ color: '#A606A9' }}>play</span> </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-3'>
                                            <div className='inning-count'>
                                                <div className='digit'>09</div>
                                                <p className='inningpara'>all the innings</p>
                                                <h6 className='won'>you Lost</h6>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className='wallet-btn mt-0 mb-0 row ' style={{ justifyContent: 'center' }}>
                                    <div className='col-lg-6 col-md-6 col-sm-12'>
                                        <button type='button' className='connect-btn mb-0 bottom-margin-15 w-100' onClick={openJoinroom}>Play Now</button>
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

export default Dashboard