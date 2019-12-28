import React from 'react'
import CP from '../CP'
import { render } from '@testing-library/react'

test('CP rendered correctly', () => {
    const { baseElement, getByText } = render(
        <CP
            cp={90}
        />,
    )
    expect(getByText('90%')).toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
})