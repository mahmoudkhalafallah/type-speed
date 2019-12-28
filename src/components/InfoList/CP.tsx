import React from 'react'
const CP: React.FC<{ cp: number }> = ({ cp }) =>
    <>
        Completion Percentage:
        <span>{cp}%</span>
    </>
export default CP