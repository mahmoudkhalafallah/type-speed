import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import Quote from './Quote'
import { QUOTE_URL } from '../constants'

const UserEntry = styled.input`
width: 100%;
padding: 14px;
margin-top: 15px;
font-size: 20px;
display: block;
border: 1px solid #ffb800;
`

const NoInteractions = styled.div`
background: rgba(238, 238, 238, 0.5);
width: 100%;
height: 100%;
position: absolute;
`
const GameContainer = styled.section`
position: relative
`

interface Props {
    gameOver: boolean;
    endGame: React.Dispatch<React.SetStateAction<boolean>>;
    setWpm: React.Dispatch<React.SetStateAction<number>>;
    setCp: React.Dispatch<React.SetStateAction<number>>;
}

const Racer: React.FC<Props> = ({ gameOver, endGame, setWpm, setCp }) => {
    const [quoteText, setQuoteText] = useState([''])
    const [typedText, setTypedText] = useState('')
    const [wordIndex, setWordIndex] = useState(0)
    const [typedTextValiditiy, setTypedTextValiditiy] = useState(false)
    const [secondsElapsed, setSecondsElapsed] = useState(0)

    const handleChange = (e: any) => {
        const val = e.target.value
        setTypedTextValiditiy(val.length > 0 && quoteText[wordIndex].startsWith(val))

        if (e.nativeEvent.data === ' ' && quoteText[wordIndex] === val.slice(0, -1)) {
            setTypedText('')
            if (wordIndex === quoteText.length - 1) {
                endGame(true)
            }
            setWordIndex(c => c + 1)
        } else {

            setTypedText(val)
        }
    }

    useEffect(() => {
        fetch(QUOTE_URL).then(res => res.text()).then((data: string) => {
            data = data.replace(/\s{2,}/g, ' ') // remove extra spaces
            setQuoteText(data.split(" "))
        })
    }, [])

    useEffect(() => {
        const timerHandle = setInterval(() => {
            if (gameOver) {
                clearInterval(timerHandle)
                const calculateCp = (quoteText.slice(0, wordIndex).join(' ').length / quoteText.join(' ').length) * 100
                setCp(parseInt(calculateCp.toFixed()))
                return
            }
            setSecondsElapsed(s => s + 1)
            const typedChars = quoteText.slice(0, wordIndex).join(' ').length
            if (secondsElapsed > 0) {
                setWpm((typedChars / 5) / (secondsElapsed / 60))
            }
        }, 1000)
        return () => {
            clearInterval(timerHandle)
        }
    }, [gameOver, quoteText, secondsElapsed, setCp, setWpm, wordIndex])

    return (
        <GameContainer>
            {gameOver && <NoInteractions />}
            {(quoteText.length > 1) &&
                <>
                    <Quote data={quoteText} index={wordIndex} length={typedText.length} isValid={typedTextValiditiy} />
                    <UserEntry value={typedText} onChange={handleChange} readOnly={gameOver} />
                </>
            }
        </GameContainer>
    )
}

export default Racer