import React, { useState } from 'react'
import './App.css'
import InfoList from './components/InfoList'
import Racer from './components/Racer'
import styled from 'styled-components'

const GameOver = styled.h2`
transition: 0.2s ease;
color: #c90000;
font-size: 48px;
z-index: 5;
display: flex;
align-items: center;
justify-content: center;
`

const App: React.FC = () => {
  const [gameOver, setGameOver] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [completionPercent, setCompletionPercent] = useState(0)


  return (
    <div className="App">
      <h1>Type Speed</h1>
      {gameOver && <GameOver>Game Over</GameOver>}
      <InfoList gameOver={gameOver} endGame={setGameOver} wpm={wpm} cp={completionPercent} />
      <Racer gameOver={gameOver} endGame={setGameOver} setWpm={setWpm} setCp={setCompletionPercent} />
    </div>
  )
}

export default App
