/* eslint-disable @typescript-eslint/no-explicit-any */

function Startgamemodel({ startGame, playersLength, isStarted }: { startGame: any, playersLength: number, isStarted: boolean }) {

    return (
        <div>
            {
                !isStarted ?
                    <div className='startgamepage'>
                        <div className="center-model">
                            <div className='start-box'>
                                <h5 className='mb-3'>Tap To Start</h5>
                                <p className='mb-3'>You can now play game</p>
                                <button type="button" className="back w-100 position-relative" style={{ zIndex: '999' }} onClick={() => { startGame(playersLength) }}>Start Game</button>
                            </div>
                        </div>
                    </div> : ""
            }

        </div>
    )
}

export default Startgamemodel