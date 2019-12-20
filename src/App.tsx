import React from 'react'
import './App.css'
import Game from './views/Game'
import { Router } from '@reach/router'
import History from './views/History'

const App: React.FC = () => {

  return (
    <div className='App' >
      <h1>Type Speed</h1>
      <Router>
        <Game path="game" />
        <History path="history/:historyId" />
      </Router>
    </div>
  )
}

export default App
