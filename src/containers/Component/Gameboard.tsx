import Dashboardheader from './Dashboardheader';
function Gameboard() {
    return (
        <div>
            <Dashboardheader />
            <section className='gamezoon'>
                <div className='container'>
                    <div className='row' style={{ justifyContent: 'center' }}>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-xl-6 col-xxl-6'>
                            <div className='multiline-game p-0'>
                                <div className='history-header'>
                                    <div className='title-header'>
                                        Game Board
                                    </div>
                                    <button type="button" className="btn-close text-reset">
                                        x
                                    </button>
                                </div>
                                <div className='player-pic-polygon'>
                                    <ul>
                                        <li>
                                            <div className='poly-small'>
                                                <div className='poly-img'>
                                                    <img src='./images/player-avt-1.svg' alt="" />
                                                    <p>Player 03</p>
                                                    <div className='digit'>50</div>
                                                </div>
                                                <div className='circle-icon'>
                                                    3
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='poly'>
                                                <div className='poly-img'>
                                                    <img src='./images/player-avt-1.svg' alt="" />
                                                    <p>Player 01</p>
                                                    <div className='digit'>50</div>
                                                </div>
                                                <div className='heat'>
                                                    <img src="./images/heat.svg" alt="" />
                                                </div>
                                                <div className='circle-icon'>
                                                    1
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='poly-small'>
                                                <div className='poly-img'>
                                                    <img src='./images/player-avt-1.svg' alt="" />
                                                    <p>Player 02</p>
                                                    <div className='digit'>50</div>
                                                </div>
                                                <div className='circle-icon'>
                                                    2
                                                </div>
                                            </div>
                                        </li>

                                    </ul>




                                </div>
                                <div className='board-padding pb-0'>
                                    <div className='board-paly-hist'>
                                        <div className='board-header'>
                                            <span>Player Name</span>
                                            <span>Total Won</span>
                                        </div>
                                        <div className='board-paly-list scrolling'>
                                            <div className='plyer-details'>
                                                <p className='ply-sr'>Player 01</p>
                                                <p className='won'>29</p>
                                            </div>
                                            <div className='plyer-details'>
                                                <p className='ply-sr'>Player 02</p>
                                                <p className='won'>29</p>
                                            </div>
                                            <div className='plyer-details'>
                                                <p className='ply-sr'>Player 03</p>
                                                <p className='won'>29</p>
                                            </div>
                                            <div className='plyer-details'>
                                                <p className='ply-sr'>Player 04</p>
                                                <p className='won'>29</p>
                                            </div>
                                            <div className='plyer-details'>
                                                <p className='ply-sr'>Player 05</p>
                                                <p className='won'>29</p>
                                            </div>
                                            <div className='plyer-details'>
                                                <p className='ply-sr'>Player 06</p>
                                                <p className='won'>29</p>
                                            </div>
                                            <div className='plyer-details'>
                                                <p className='ply-sr'>Player 07</p>
                                                <p className='won'>29</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='history-footer'>
                                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                                        <div id="pagination">
                                            <div className="pagination-list">
                                                <nav aria-label="Page navigation example">
                                                    <ul className="pagination justify-content-center">

                                                        <li className="page-item">
                                                            <a className="page-link"
                                                                href="#"
                                                                data-ci-pagination-page="0">
                                                                <i className="fa fa-angle-double-left"
                                                                    aria-hidden="true"></i> Prev
                                                            </a>
                                                        </li>
                                                        <li className="page-item"><a className="page-link"
                                                            href="#"
                                                            data-ci-pagination-page="0">1</a></li>
                                                        <li className="page-item page-link current">2</li>
                                                        <li className="page-item"><a className="page-link"
                                                            href="#"
                                                            data-ci-pagination-page="48">3</a></li>
                                                        <li className="page-item"><a className="page-link"
                                                            href="#"
                                                            data-ci-pagination-page="72">4</a></li>

                                                        <li className="page-item">
                                                            <a className="page-link"
                                                                href="#"
                                                                data-ci-pagination-page="48">
                                                                Next
                                                                <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
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

export default Gameboard