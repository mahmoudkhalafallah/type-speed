import React from 'react'
import Quote from '../components/Quote'

const str = 'Pork rump minim, laborum spare ribs pancetta lorem ut meatloaf ullamco swine sint voluptate pariatur. Ullamco mollit consequat est. Esse brisket spare ribs ipsum eiusmod t-bone mollit veniam. Exercitation short loin filet mignon, tenderloin tail anim kevin ribeye minim beef velit esse salami. Rump et do landjaeger.'.split(' ');

test('Quote rendered correctly', () => {
    expect(<Quote data={str} index={0} length={0} isValid={false} />)
        .toMatchSnapshot()
})

test('Quote is valid', () => {
    expect(<Quote data={str} index={0} length={1} isValid={true} />)
        .toMatchSnapshot()
})


test('Quote is invalid', () => {
    expect(<Quote data={str} index={0} length={1} isValid={false} />)
        .toMatchSnapshot()
})