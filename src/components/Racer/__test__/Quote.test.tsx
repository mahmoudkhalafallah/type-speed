import React from 'react'
import Quote from '../Quote'
import { render } from '@testing-library/react'

const str = 'Pork rump minim, laborum spare ribs pancetta lorem ut meatloaf ullamco swine sint voluptate pariatur. Ullamco mollit consequat est. Esse brisket spare ribs ipsum eiusmod t-bone mollit veniam. Exercitation short loin filet mignon, tenderloin tail anim kevin ribeye minim beef velit esse salami. Rump et do landjaeger.'.split(' ')

test('Quote rendered correctly', () => {
    const { baseElement } = render(
        <Quote data={str} index={0} length={0} isValid={false} />,
    )

    expect(baseElement).toMatchSnapshot()
})

test('Quote is valid', () => {
    const { baseElement } = render(
        <Quote data={str} index={0} length={1} isValid={true} />,
    )

    expect(baseElement).toMatchSnapshot()
})

test('Quote is invalid', () => {
    const { baseElement } = render(
        <Quote data={str} index={0} length={1} isValid={false} />,
    )

    expect(baseElement).toMatchSnapshot()
})