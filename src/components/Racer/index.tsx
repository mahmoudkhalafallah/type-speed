import React, { useEffect, useState } from 'react'
import { QUOTE_URL } from '../../constants'
import RacerContainer from './RacerContainer'

const AVERAGE_WORD_LENGTH = 5 // "word" is often standardized to be five characters or keystrokes long in English
const SECONDS_IN_MINUTE = 60 // number of seconds in a minute

interface Props {
    gameOver: boolean;
    endGame: React.Dispatch<React.SetStateAction<boolean>>;
    setWpm: React.Dispatch<React.SetStateAction<number>>;
    setCp: React.Dispatch<React.SetStateAction<number>>;
}

const Racer: React.FC<Props> = ({ gameOver, endGame, setWpm, setCp }) => {
    const [quoteText, setQuoteText] = useState({ text: [''], count: 0 })
    const [typedText, setTypedText] = useState('')
    const [wordIndex, setWordIndex] = useState(0)
    const [typedTextValiditiy, setTypedTextValiditiy] = useState(false)
    const [secondsElapsed, setSecondsElapsed] = useState(0)

    const handleChange = (e: any) => {
        const val = e.target.value
        setTypedTextValiditiy(val.length > 0 && quoteText.text[wordIndex].startsWith(val))

        if (e.nativeEvent.data === ' ' && quoteText.text[wordIndex] === val.slice(0, -1)) { // if user enters a space and the typed word matches the quote word
            setTypedText('') // clear the current typed text
            if (wordIndex === quoteText.text.length - 1) { // if the accepted word is the last word in the quote end the game
                endGame(true)
                return
            }
            setWordIndex(c => c + 1) // and update the current word index
        } else { // otherwise just update the typed text
            setTypedText(val)
        }
    }

    useEffect(() => {
        fetch(QUOTE_URL).then(res => res.text()).then((data: string) => {
            data = data.replace(/\s{2,}/g, ' ') // remove extra spaces
            setQuoteText({ text: data.split(" "), count: data.length })
        })
    }, [])

    useEffect(() => {
        const timerHandle = setInterval(() => {
            const typedCharsCount = quoteText.text.slice(0, wordIndex).join(' ').length

            // Calculate Words Per Minute rate
            if (secondsElapsed > 0 && typedCharsCount > 0) {
                const wordsCount = (typedCharsCount / AVERAGE_WORD_LENGTH)
                const minutesCount = (secondsElapsed / SECONDS_IN_MINUTE)
                const wpm = (wordsCount / minutesCount).toFixed()

                setWpm(parseInt(wpm))
            }

            if (gameOver) {
                clearInterval(timerHandle)
                // Calculate Completion Percentage
                const calculateCp = (typedCharsCount / quoteText.count) * 100
                setCp(parseInt(calculateCp.toFixed()))

                return
            }
            setSecondsElapsed(e => e + 1)

        }, 1000)
        return () => {
            clearInterval(timerHandle)
        }
    }, [gameOver, quoteText, secondsElapsed, setCp, setWpm, wordIndex])

    return (
        <RacerContainer
            gameOver={gameOver}
            handleChange={handleChange}
            quoteText={quoteText}
            typedText={typedText}
            typedTextValiditiy={typedTextValiditiy}
            wordIndex={wordIndex}
        />
    )
}

export default Racer