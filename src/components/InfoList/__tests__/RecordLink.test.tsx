import React from 'react'
import RecordLink from '../RecordLink'
import { render } from '@testing-library/react'

const testId = 'testId'

test('RecordLink rendered correctly', () => {
    const { baseElement, queryByTestId } = render(
        <RecordLink
            historyId={testId}
        />,
    )
    expect(queryByTestId('recordLink')).toHaveAttribute('href', `/history/${testId}`)
    expect(baseElement).toMatchSnapshot()
})