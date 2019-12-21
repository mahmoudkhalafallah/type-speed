import React from 'react'
import History from '../History'
import renderer from 'react-test-renderer'
import 'jest-fetch-mock'

test('History rendered correctly', () => {
    const component = renderer.create(
        <History historyId='m0nww' />,
    )
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})
