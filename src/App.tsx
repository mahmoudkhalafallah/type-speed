import React from 'react'
import './App.css'
import Game from './views/Game'
import { Router, Redirect } from '@reach/router'
import History from './views/History'
import Login from './views/Login'
import styled from 'styled-components'

const GameName = styled.h1`
  font-family: capture_it;
  font-size: 45px;
  font-weight: 100;
`

const App: React.FC = () => {
  return (
    <div className='App' >
      <GameName>Type Speed</GameName>
      <Router>
        <Game path="game" />
        <History path="history/:historyId" />
        <Login path="/" />
        <Redirect noThrow default to="/" from="*" />
      </Router>
    </div>
  )
}

export default App
