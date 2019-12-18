import React, { useState } from 'react'
import './App.css'
import InfoList from './components/InfoList'
import Racer from './components/Racer'


const App: React.FC = () => {
  const [gameOver, setGameOver] = useState(false)
  return (
    <div className="App">
      <h1>Type Speed</h1>
      <Racer />
    </div>
  )
}

export default App
