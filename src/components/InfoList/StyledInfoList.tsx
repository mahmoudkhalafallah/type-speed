import React from 'react'
import styled from 'styled-components'
import Time from './Time'
import WPM from './WPM'
import CP from './CP'
import RecordLink from './RecordLink'

const StyledList = styled.ul`
align-self: flex-end;
text-align: end;
margin: 25px 0;
list-style: none;
font-family: "capture_it";
`
const StyledItem = styled.li`
margin-bottom: 5px;
span {
    min-width: 70px;
    display: inline-block;
}
a {
    color: #3d3d3d;
}
`

interface Props {
    time: { minutes: number, seconds: number };
    gameOver: boolean;
    wpm: number;
    cp: number;
    historyId: string
}

const StyledInfoList: React.FC<Props> = ({ time, gameOver, wpm, cp, historyId }) => {
    return <StyledList>
        <StyledItem>
            <Time minutes={time.minutes} seconds={time.seconds} />
        </StyledItem>
        <StyledItem>
            <WPM wpm={wpm} />
        </StyledItem>
        {gameOver && <StyledItem>
            <CP cp={cp} />
        </StyledItem>}
        {(historyId.length > 0) && <StyledItem>
            <RecordLink historyId={historyId} />
        </StyledItem>}
    </StyledList>
}

export default StyledInfoList