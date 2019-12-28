import React from 'react'
import Login from '../Login'
import { render } from '@testing-library/react'

test('Login rendered correctly', () => {
    const component = render(
        <Login />
    )

    expect(component).toMatchSnapshot()
})