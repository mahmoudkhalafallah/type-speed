import React from 'react'
import './App.css'
import Game from './views/Game'
import { Router, Redirect } from '@reach/router'
import History from './views/History'
import Login from './views/Login'

const App: React.FC = () => {

  return (
    <div className='App' >
      <h1>Type Speed</h1>
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
