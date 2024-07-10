function Loading() {
    return (
        <div>
            <div className='loading'>
                <div className='container'>
                    <div className='row'>
                        <div className='start-loading'>
                            <div className='Loading-box'>
                                <img src="./images/logo.png" alt=""></img>
                                <div className="progress mt-4 mb-2">
                                    <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "70%" }}></div>
                                </div>
                                <div className='percent-info'>
                                    <p className='loadname'>Loading...</p>
                                    <span className='percent'>70%</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        </div>
    )
}

export default Loading