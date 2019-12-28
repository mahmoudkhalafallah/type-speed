import React from 'react'
import styled from 'styled-components'

const WpmIndicator = styled.span`
    color: ${({ wpm }: { wpm: number }) => {
        if (wpm > 35) {
            return 'green'
        } else if (wpm <= 35 && wpm > 23) {
            return '#de5615'
        } else {
            return 'red'
        }
    }};
`

const WPM: React.FC<{ wpm: number }> = ({ wpm }) =>
    <>
        Words Per Minute: <WpmIndicator wpm={wpm}>{wpm} WPM</WpmIndicator>
    </>
export default WPM