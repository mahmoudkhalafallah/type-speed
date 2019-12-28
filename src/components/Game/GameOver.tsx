import React from 'react'
import styled from 'styled-components'

const GameOverTitle = styled.h2`
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
const GameOver: React.FC<{ restartGame: (value: React.SetStateAction<boolean>) => void }> = ({ restartGame }) =>
    <>
        <GameOverTitle>Game Over</GameOverTitle>
        <PlayAgainBtn onClick={() => { restartGame(true) }}>Play Again !</PlayAgainBtn>
    </>
export default GameOver


