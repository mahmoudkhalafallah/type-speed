import React from 'react'
const Time: React.FC<{ minutes: number, seconds: number }> = ({ minutes, seconds }) =>
    <>
        Time:
        <span>{minutes}:{seconds > 9 ? seconds : `0${seconds}`}</span>
    </>
export default Time