import React from 'react'
import InfoList from '../InfoList'
import { render } from '@testing-library/react'

const cp = 0
const wpm = 30
const historyId = ''
const gameOver = false
const endGame = jest.fn()

test('InfoList rendered correctly', () => {
    const component = render(
        <InfoList
            cp={cp}
            wpm={wpm}
            historyId={historyId}
            gameOver={gameOver}
            endGame={endGame}
        />,
    )

    expect(component).toMatchSnapshot()
})

test('InfoList rendered correctly on game over', () => {
    const component = render(
        <InfoList
            cp={20}
            wpm={wpm}
            historyId={'xyz'}
            gameOver={!gameOver}
            endGame={endGame}
        />,
    )

    expect(component).toMatchSnapshot()
})
