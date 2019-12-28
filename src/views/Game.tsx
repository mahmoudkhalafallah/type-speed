import React, { useState, useEffect } from 'react'
import InfoList from '../components/InfoList'
import Racer from '../components/Racer'
import { HISTORY_URL } from '../constants'
import { RouteComponentProps } from "@reach/router" // eslint-disable-line no-unused-vars
import StatsContext from '../utils/context/StatsContext'
import GameOver from '../components/Game/GameOver'
import HistoryTable from '../components/Game/HistoryTable'


const Game: React.FC<RouteComponentProps> = ({ location }) => {
    const [gameOver, setGameOver] = useState(false)
    const [restartGame, setRestartGame] = useState(false)
    const [wpm, setWpm] = useState(0)
    const [cp, setCp] = useState(0)
    const [historyId, setHistoryId] = useState('')

    useEffect(() => {
        if (gameOver && cp > 0) {
            fetch(HISTORY_URL,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        wpm,
                        cp: cp
                    })
                }
            ).then(res => res.json()).then((data: { uri: string }) => {
                const splittedText = data.uri.split('/')
                setHistoryId(splittedText[splittedText.length - 1])
            })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [gameOver, cp, wpm])


    useEffect(() => {
        if (restartGame) {
            setGameOver(false)
            setRestartGame(false)
        }
    }, [restartGame])

    return (
        <>
            {gameOver && <GameOver restartGame={setRestartGame} />}
            {
                !restartGame &&
                <StatsContext.Provider value={{ wpm, cp, historyId }}>
                    <InfoList gameOver={gameOver} endGame={setGameOver} />
                    <Racer gameOver={gameOver} endGame={setGameOver} setWpm={setWpm} setCp={setCp} />
                </StatsContext.Provider>
            }
            {
                (location && location.state && location.state.history) ? <HistoryTable history={location.state.history} /> : null
            }
        </>
    )
}

export default Game
