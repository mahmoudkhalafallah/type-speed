import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import InfoList from '../components/InfoList'
import Racer from '../components/Racer'
import { HISTORY_URL } from '../constants'

const GameOver = styled.h2`
transition: 0.2s ease;
color: #c90000;
font-size: 48px;
z-index: 5;
display: flex;
align-items: center;
justify-content: center;
`

const Game: React.FC = () => {
    const [gameOver, setGameOver] = useState(false)
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
        }
    }, [gameOver, completionPercent, wpm])

    return (
        <div className="Game">
            {gameOver && <GameOver>Game Over</GameOver>}
            <InfoList gameOver={gameOver} endGame={setGameOver} wpm={wpm} cp={completionPercent} historyId={gameRecordsHistoryId} />
            <Racer gameOver={gameOver} endGame={setGameOver} setWpm={setWpm} setCp={setCompletionPercent} />
        </div>
    )
}

export default Game
