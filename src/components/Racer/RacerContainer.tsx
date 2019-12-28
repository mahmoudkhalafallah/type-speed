// eslint-disable-next-line no-unused-vars
import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import Quote from './Quote'

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
const StyledRacerContainer = styled.section`
position: relative;
`

interface Props {
    gameOver: boolean;
    quoteText: { text: string[], count: number };
    wordIndex: number;
    typedText: string;
    typedTextValiditiy: boolean;
    handleChange: (e: ChangeEvent) => void
}

const RacerContainer: React.FC<Props> = ({ gameOver, quoteText, wordIndex, typedText, typedTextValiditiy, handleChange }) =>
    <StyledRacerContainer>
        {gameOver && <NoInteractions />}
        {(quoteText.count > 0) &&
            <>
                <Quote
                    data={quoteText.text}
                    index={wordIndex}
                    length={typedText.length}
                    isValid={typedTextValiditiy}
                />
                <UserEntry
                    value={typedText}
                    onChange={handleChange}
                    readOnly={gameOver}
                />
            </>
        }
    </StyledRacerContainer>
export default RacerContainer