/* eslint-disable no-undef */
import React from 'react'
import History from '../History'
import { render } from '@testing-library/react'

test('History rendered correctly', async () => {

    const component = render(
        <History historyId='m0nww' />,
    )

    expect(component).toMatchSnapshot()

})
