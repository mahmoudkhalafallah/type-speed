import React from 'react'
import InfoList from '../InfoList'
import renderer from 'react-test-renderer'

const cp = 0
const wpm = 30
const historyId = ''
const gameOver = false
const endGame = () => { }

test('InfoList rendered correctly', () => {
    const component = renderer.create(
        <InfoList
            cp={cp}
            wpm={wpm}
            historyId={historyId}
            gameOver={gameOver}
            endGame={endGame}
        />,
    )
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})

test('InfoList rendered correctly on game over', () => {
    const component = renderer.create(
        <InfoList
            cp={20}
            wpm={wpm}
            historyId={'xyz'}
            gameOver={!gameOver}
            endGame={endGame}
        />,
    )
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})
