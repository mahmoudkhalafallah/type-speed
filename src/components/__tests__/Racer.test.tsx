import React from 'react'
import Racer from '../Racer'
import { render } from '@testing-library/react'

test('Racer rendered correctly', () => {
    const component = render(
        <Racer gameOver={false} endGame={() => { }} setCp={() => { }} setWpm={() => { }} />,
    )

    expect(component).toMatchSnapshot()
})

test('Racer rendered correctly on game over', () => {
    const component = render(
        <Racer gameOver={true} endGame={() => { }} setCp={() => { }} setWpm={() => { }} />,
    )

    expect(component).toMatchSnapshot()
})

