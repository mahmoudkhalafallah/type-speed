import React from 'react'
import Racer from '../Racer'
import renderer from 'react-test-renderer'
import 'jest-fetch-mock'

test('Racer rendered correctly', () => {
    const component = renderer.create(
        <Racer gameOver={false} endGame={() => { }} setCp={() => { }} setWpm={() => { }} />,
    )
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})

test('Racer rendered correctly on game over', () => {
    const component = renderer.create(
        <Racer gameOver={true} endGame={() => { }} setCp={() => { }} setWpm={() => { }} />,
    )
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})

