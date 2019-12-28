// eslint-disable-next-line no-unused-vars
import React, { Dispatch, SetStateAction } from 'react'
import Racer from '..'
import { render } from '@testing-library/react'

const endGame: Dispatch<SetStateAction<boolean>> = jest.fn((val) => val)
const setWpm: Dispatch<SetStateAction<number>> = jest.fn((val) => val)
const setCp: Dispatch<SetStateAction<number>> = jest.fn((val) => val)

test('Racer rendered correctly', () => {
    const { baseElement } = render(
        <Racer gameOver={false} endGame={endGame} setCp={setCp} setWpm={setWpm} />,
    )

    expect(baseElement).toMatchSnapshot()
})
