import React from 'react'
// eslint-disable-next-line no-unused-vars
import { RouteComponentProps } from '@reach/router'

declare interface Props extends RouteComponentProps {
    historyId?: string
}

const History: React.FC<Props> = ({ historyId }) => {
    console.log(historyId)

    return <>
    </>
}

export default History