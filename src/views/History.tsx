import React, { useEffect, useState } from 'react'
import { HISTORY_URL } from '../constants'
import { RouteComponentProps } from "@reach/router" // eslint-disable-line no-unused-vars
import styled from 'styled-components'

declare interface Props extends RouteComponentProps {
    historyId?: string
}

const RecordList = styled.ul`
list-style: none;
padding: 0;
`

const RecordItem = styled.li`
display: flex;
justify-content: space-between;
font-size: 20px;
`
const RecordNum = styled.b`
margin-left: 15px;
`

const History: React.FC<Props> = ({ historyId }) => {

    const [gameRecordsHistoryData, setGameRecordsHistoryData] = useState({ "wpm": "", "cp": "" })
    const [dataLoaded, setDataLoaded] = useState(false)


    useEffect(() => {
        if (historyId && historyId.length > 0) {
            fetch(`${HISTORY_URL}/${historyId}`)
                .then(res => res.json())
                .then((data: { "wpm": string, "cp": string }) => {
                    setGameRecordsHistoryData(data)
                })
                .catch(err => err)
                .finally(() => {
                    setDataLoaded(true)
                })
        }
    }, [historyId])

    return <>
        {(gameRecordsHistoryData.wpm && gameRecordsHistoryData.cp) ?
            <RecordList data-testid='recordList'>
                <RecordItem>Words per minute: <RecordNum>{gameRecordsHistoryData.wpm}</RecordNum>WPM</RecordItem>
                <RecordItem>Completion Percentage: <RecordNum>{gameRecordsHistoryData.cp}</RecordNum> %</RecordItem>
            </RecordList> :
            dataLoaded ? <h2>No Records</h2> : <span>Loading</span>
        }
    </>
}

export default History