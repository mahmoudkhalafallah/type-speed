import React from 'react'
import InfoList from '..'
import { render } from '@testing-library/react'

const gameOver = false
const endGame = jest.fn()

test('InfoList rendered correctly', () => {
    const { baseElement } = render(
        <InfoList
            gameOver={gameOver}
            endGame={endGame}
        />,
    )

    expect(baseElement).toMatchSnapshot()
})

test('InfoList rendered correctly on game over', () => {
    const { baseElement } = render(
        <InfoList
            gameOver={!gameOver}
            endGame={endGame}
        />,
    )

    expect(baseElement).toMatchSnapshot()
})
