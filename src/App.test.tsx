import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import 'jest-fetch-mock'

test('App renders', () => {
    render(<App />)
})
