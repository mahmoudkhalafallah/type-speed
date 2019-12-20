import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { HISTORY_URL } from '../constants'

const StyledInfoList = styled.ul`
align-self: flex-end;
text-align: end;
margin: 25px 0;
font-weight: bold;
list-style: none;
`
const StyledInfoItem = styled.li`
margin-bottom: 5px;
`

interface Props {
    endGame: React.Dispatch<React.SetStateAction<boolean>>;
    gameOver: boolean;
    wpm: number;
    cp: number;
    historyId: string
}

const InfoList: React.FC<Props> = ({ endGame, gameOver, wpm, cp, historyId }) => {
    const [time, setTime] = useState({ minutes: 0, seconds: 5 })

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

    return <StyledInfoList>
        <StyledInfoItem>Time: {time.minutes}:{time.seconds > 9 ? time.seconds : `0${time.seconds}`}</StyledInfoItem>
        <StyledInfoItem>
            <span>{wpm}</span> WPM
		</StyledInfoItem>
        {gameOver && <StyledInfoItem>
            Completion Percentage: <span>{cp}</span>%
		</StyledInfoItem>}
        {(historyId.length > 0) && <StyledInfoItem>Find your record <a href={`${HISTORY_URL}/${historyId}`} target='_blank' rel="noopener noreferrer" >here</a></StyledInfoItem>}
    </StyledInfoList>
}

export default InfoList
