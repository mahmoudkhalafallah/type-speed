import React from 'react'
import Game from '../Game'
import { render } from '@testing-library/react'

test('Game rendered correctly', () => {
    const component = render(
        <Game />,
    )

    expect(component).toMatchSnapshot()
})
