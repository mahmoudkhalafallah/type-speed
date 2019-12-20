import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import InfoList from '../components/InfoList'
import Racer from '../components/Racer'
import { HISTORY_URL } from '../constants'
// eslint-disable-next-line no-unused-vars
import { RouteComponentProps } from '@reach/router'

const GameOver = styled.h2`
transition: 0.2s ease;
color: #c90000;
font-size: 48px;
z-index: 5;
text-align: center;
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
font-weight: bold;
transition: color, transform 0.3s ease;
&:hover {
    background: #1c9d1c;
    color: #fff;
    transform: scale(1.1);
}
`

const Game: React.FC<RouteComponentProps> = () => {
    const [gameOver, setGameOver] = useState(false)
    const [restartGame, setRestartGame] = useState(false)
    const [wpm, setWpm] = useState(0)
    const [completionPercent, setCompletionPercent] = useState(0)
    const [gameRecordsHistoryId, setGameRecordsHistoryId] = useState('')


    useEffect(() => {
        if (gameOver && completionPercent > 0) {
            fetch(HISTORY_URL,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        wpm,
                        cp: completionPercent
                    })
                }
            ).then(res => res.json()).then((data: { uri: string }) => {
                const splittedText = data.uri.split('/')
                setGameRecordsHistoryId(splittedText[splittedText.length - 1])
            })
                .catch((err) => {
                    console.log(err)

                })
        }
    }, [gameOver, completionPercent, wpm])


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
                <PlayAgainBtn onClick={() => { setRestartGame(true) }}>Play Again!</PlayAgainBtn>
            </>}
            {
                !restartGame &&
                <>
                    <InfoList gameOver={gameOver} endGame={setGameOver} wpm={wpm} cp={completionPercent} historyId={gameRecordsHistoryId} />
                    <Racer gameOver={gameOver} endGame={setGameOver} setWpm={setWpm} setCp={setCompletionPercent} />
                </>
            }
        </div>
    )
}

export default Game
