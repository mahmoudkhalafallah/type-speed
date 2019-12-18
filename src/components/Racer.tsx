import React, { useEffect, useState } from 'react'

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

const Racer: React.FC = () => {
    let [quoteText, setQuoteText] = useState([''])
    let [typedText, setTypedText] = useState('')
    let [wordIndex, setWordIndex] = useState(0)
    let [typedTextValiditiy, setTypedTextValiditiy] = useState(false)

    const handleChange = (e: any) => {
        const val = e.target.value
        setTypedTextValiditiy(val.length > 0 && quoteText[wordIndex].startsWith(val))

        if (e.nativeEvent.data === ' ' && quoteText[wordIndex] === val.slice(0, -1)) {
            setTypedText('')
            setWordIndex(c => c + 1)
        } else {
            setTypedText(val)
        }
    }

    useEffect(() => {
        fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text').then(res => res.text()).then((data: string) => {
            data = data.replace(/\s{2,}/g, ' ') // remove extra spaces
            setQuoteText(data.split(" "))
        })
    }, [])

    return (
        <>
            <Quote data={quoteText} index={wordIndex} length={typedText.length} isValid={typedTextValiditiy} />
            <UserEntry value={typedText} onChange={handleChange} />
        </>
    )
}

export default Racer