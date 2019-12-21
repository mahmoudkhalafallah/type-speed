import React from 'react'
import Quote from '../Quote'
import renderer from 'react-test-renderer'

const str = 'Pork rump minim, laborum spare ribs pancetta lorem ut meatloaf ullamco swine sint voluptate pariatur. Ullamco mollit consequat est. Esse brisket spare ribs ipsum eiusmod t-bone mollit veniam. Exercitation short loin filet mignon, tenderloin tail anim kevin ribeye minim beef velit esse salami. Rump et do landjaeger.'.split(' ')

test('Quote rendered correctly', () => {
    const component = renderer.create(
        <Quote data={str} index={0} length={0} isValid={false} />,
    )
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})

test('Quote is valid', () => {
    const component = renderer.create(
        <Quote data={str} index={0} length={1} isValid={true} />,
    )
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})

test('Quote is invalid', () => {
    const component = renderer.create(
        <Quote data={str} index={0} length={1} isValid={false} />,
    )
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})