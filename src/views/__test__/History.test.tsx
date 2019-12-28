/* eslint-disable no-undef */
import React from 'react'
import History from '../History'
import { render, waitForElement, cleanup } from '@testing-library/react'

beforeEach(() => {
    cleanup()
    fetchMock.mockClear()
})

test('History rendered correctly with data', async () => {
    const serverResponse = { wpm: 15, cp: 5 }
    fetchMock.mockResponseOnce(JSON.stringify(serverResponse))

    const { getByTestId, getByText, queryByText, baseElement } = render(
        <History historyId='m0nww' />,
    )

    expect(getByText('Loading')).toBeTruthy()

    await waitForElement(() => getByTestId('recordList'))

    expect(queryByText('Loading')).toBeFalsy()

    expect(getByText(serverResponse.wpm.toString())).toHaveTextContent(serverResponse.wpm.toString())

    expect(baseElement).toMatchSnapshot()

})

test('History rendered correctly with empty data', async () => {
    const serverResponse = {}
    fetchMock.mockResponseOnce(JSON.stringify(serverResponse))

    const { getByText, queryByText, baseElement } = render(
        <History historyId='msfdz' />,
    )

    expect(getByText('Loading')).toBeTruthy()

    await waitForElement(() => getByText('No Records'))

    expect(queryByText('Loading')).toBeFalsy()

    expect(getByText('No Records')).toBeInTheDocument()

    expect(baseElement).toMatchSnapshot()

})


test('History rendered correctly with error', async () => {
    const err = new Error('Not Found')
    fetchMock.mockRejectOnce(err)

    const { getByText, queryByText, baseElement } = render(
        <History historyId='err' />,
    )

    expect(getByText('Loading')).toBeTruthy()

    await waitForElement(() => getByText('No Records'))

    expect(queryByText('Loading')).toBeFalsy()

    expect(getByText('No Records')).toBeInTheDocument()

    expect(baseElement).toMatchSnapshot()

})