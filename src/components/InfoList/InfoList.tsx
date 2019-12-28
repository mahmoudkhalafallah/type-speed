import React, { useEffect, useState, useCallback } from 'react'
import StyledInfoList from './StyledInfoList'

interface Props {
    endGame: React.Dispatch<React.SetStateAction<boolean>>;
    gameOver: boolean;
}

const InfoList: React.FC<Props> = ({ endGame, gameOver }) => {
    const [time, setTime] = useState({ minutes: 3, seconds: 0 })

    const stopGame = useCallback((timerHandle: NodeJS.Timeout) => {
        clearInterval(timerHandle)
        endGame(true)
    }, [endGame])

    useEffect(() => {
        const timerHandle = setInterval(() => {
            if (time.seconds > 0) {
                setTime(t => ({ minutes: t.minutes, seconds: t.seconds - 1 }))
            } else if (time.seconds === 0) {
                if (time.minutes === 0) {
                    stopGame(timerHandle)
                    return
                }
                setTime(t => ({ minutes: t.minutes - 1, seconds: 59 }))
            }
        }, 1000)

        if (gameOver) {
            stopGame(timerHandle)
            return
        }

        return () => {
            clearInterval(timerHandle)
        }
    }, [gameOver, stopGame, time.minutes, time.seconds])

    return <StyledInfoList time={time} showCp={gameOver} />
}

export default InfoList
