import React from 'react'
import InfoList from '../InfoList'
import { render } from '@testing-library/react'

const gameOver = false
const endGame = jest.fn()

test('InfoList rendered correctly', () => {
    const component = render(
        <InfoList
            gameOver={gameOver}
            endGame={endGame}
        />,
    )

    expect(component).toMatchSnapshot()
})

test('InfoList rendered correctly on game over', () => {
    const component = render(
        <InfoList
            gameOver={!gameOver}
            endGame={endGame}
        />,
    )

    expect(component).toMatchSnapshot()
})
