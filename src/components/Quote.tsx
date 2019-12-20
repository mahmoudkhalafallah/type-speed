import React from 'react'
import styled from "styled-components"

const StyledQuote = styled.div`
width: 100%;
padding: 15px;
font-size: 20px;
background: #e7e7e7;
user-select: none;
`

const GreenText = styled.span`
color: green;
`

const RedText = styled.span`
background: #e34d4d;
color: #fff;
`

const ActiveText = styled.span`
text-decoration: underline;
`

interface Props {
    data: string[];
    index: number;
    length: number;
    isValid: boolean;
}

const Quote: React.FC<Props> = ({ data, index, length, isValid }) => <StyledQuote>
    {data.length && data.slice(0, index).join(" ")}
    {(index > 0) && " "}
    {data[index] && (isValid ? <GreenText>{data[index].slice(0, length)}</GreenText> : <RedText>{data[index].slice(0, length)}</RedText>)}
    {data[index] && <ActiveText>{data[index].slice(length)}</ActiveText>}
    {" "}
    {data.length && data.slice(index + 1).join(" ")}
</StyledQuote>

export default Quote