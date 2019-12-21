import React from 'react'
import Game from '../Game'
import renderer from 'react-test-renderer'
import 'jest-fetch-mock'

test('Game rendered correctly', () => {
    const component = renderer.create(
        <Game />,
    )
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})
