import React from 'react'
import { Link } from '@reach/router'
const RecordLink: React.FC<{ historyId: string }> = ({ historyId }) =>
    <>
        Find your record <Link to={`/history/${historyId}`} data-testid="recordLink">here</Link>
    </>
export default RecordLink