import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import InfoList from '../components/InfoList/InfoList'
import Racer from '../components/Racer'
import { HISTORY_URL } from '../constants'
import { RouteComponentProps } from "@reach/router" // eslint-disable-line no-unused-vars
import StatsContext from '../utils/context/StatsContext'

const GameOver = styled.h2`
transition: 0.2s ease;
color: #c90000;
font-size: 40px;
z-index: 5;
text-align: center;
font-weight: 100;
font-family: "capture_it";
`

const PlayAgainBtn = styled.button`
display: block;
margin: 0 auto;
background: #000;
border: 0;
padding: 15px 20px;
color: #fcc944;
font-size: 20px;
cursor: pointer;
transition: 0.3s ease;
font-family: "capture_it";
&:hover {
    background: #1c9d1c;
    color: #fff;
    transform: scale(1.1);
}
`

const HistoryContainer = styled.section`
background: #fff;
padding: 20px;
margin: 50px 0;
.section-header {
    margin: 0;
}
`

const HistoryTable = styled.table`
    width: 100%;
    margin-top: 25px;
    th, td {
        text-align: start;
        padding: 10px 5px;
    }
    tbody tr:nth-child(odd) {
        background: #eee;
    }
`

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
        <div className="Game">
            {gameOver && <>
                <GameOver>Game Over</GameOver>
                <PlayAgainBtn onClick={() => { setRestartGame(true) }}>Play Again !</PlayAgainBtn>
            </>}
            {
                !restartGame &&
                <StatsContext.Provider value={{ wpm, cp, historyId }}>
                    <InfoList gameOver={gameOver} endGame={setGameOver} />
                    <Racer gameOver={gameOver} endGame={setGameOver} setWpm={setWpm} setCp={setCp} />
                </StatsContext.Provider>
            }
            {
                (location && location.state && location.state.history) ? <HistoryContainer>
                    <h2 className='section-header'>History</h2>
                    <HistoryTable>
                        <thead>
                            <tr>
                                <th />
                                <th>Date</th>
                                <th>WPM</th>
                                <th>Completion Percent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {location.state.history.map(
                                (h: any, index: number) => {
                                    const date = new Date(+h.date)
                                    return <tr key={h.date}>
                                        <td>{index + 1}</td>
                                        <td>{`
                                            ${date.getMonth()}-${date.getDate()}-${date.getFullYear()}
                                             ${date.getHours()}:${date.getMinutes()}
                                            `}</td>
                                        <td>{h.wpm}</td>
                                        <td>{h.cp}</td>
                                    </tr>
                                }
                            )}
                        </tbody>
                    </HistoryTable>
                </HistoryContainer> : null
            }
        </div>
    )
}

export default Game
