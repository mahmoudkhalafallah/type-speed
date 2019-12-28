import React from 'react'
import StyledInfoList from '../StyledInfoList'
import { render } from '@testing-library/react'
import StatsContext from '../../../utils/context/StatsContext'


test('StyledInfoList rendered correctly', () => {
    const { baseElement } = render(
        <StatsContext.Provider value={{ wpm: 0, cp: 0, historyId: '' }}>
            <StyledInfoList
                showCp={false}
                time={{ minutes: 3, seconds: 0 }}
            />
        </StatsContext.Provider>
    )
    expect(baseElement).toMatchSnapshot()
})

test('StyledInfoList rendered correctly after time is up', () => {
    const { baseElement } = render(
        <StatsContext.Provider value={{ wpm: 30, cp: 80, historyId: 'xyz' }}>
            <StyledInfoList
                showCp={true}
                time={{ minutes: 0, seconds: 0 }}
            />
        </StatsContext.Provider>,
    )
    expect(baseElement).toMatchSnapshot()
})