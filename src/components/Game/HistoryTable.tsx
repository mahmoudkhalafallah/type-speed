import React from 'react'
import styled from 'styled-components'
// eslint-disable-next-line no-unused-vars
import { WindowLocation } from '@reach/router'

const TableContainer = styled.section`
background: #fff;
padding: 20px;
margin: 50px 0;
.section-header {
    margin: 0;
}
`

const Table = styled.table`
    width: 100%;
    margin-top: 25px;
    th, td {
        text-align: start;
        padding: 10px 5px;
    }
    tbody tr:nth-child(odd) {
        background: #eee;
    }
`

const HistoryTable: React.FC<{ history: any[] }> = ({ history }) =>
    <TableContainer>
        <h2 className='section-header'>History</h2>
        <Table>
            <thead>
                <tr>
                    <th />
                    <th>Date</th>
                    <th>WPM</th>
                    <th>Completion Percent</th>
                </tr>
            </thead>
            <tbody>
                {history.map(
                    (h: any, index: number) => {
                        const date = new Date(+h.date)
                        return <tr key={h.date}>
                            <td>{index + 1}</td>
                            <td>{`
                        ${date.getMonth()}-${date.getDate()}-${date.getFullYear()}
                         ${date.getHours()}:${date.getMinutes()}
                        `}</td>
                            <td>{h.wpm}</td>
                            <td>{h.cp}</td>
                        </tr>
                    }
                )}
            </tbody>
        </Table>
    </TableContainer>
export default HistoryTable