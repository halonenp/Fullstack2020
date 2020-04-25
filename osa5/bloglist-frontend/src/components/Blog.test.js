import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom' 
import Blog from './Blog'

test('renders title and author', () => {
    const blog = {
        title: 'otsikko',
        author: 'kirjoittaja',
        url: 'urliurli',
        likes: 0,
        user: "peksi"
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'otsikko', 'kirjoittaja'
    )
})  

test('show url and likes after button is pressed', async () => {
    const blog = {
        title: 'otsikko',
        author: 'kirjoittaja',
        url: 'urliurli',
        likes: 0,
        user : 'peksi'
    }

    const component = render(
        <Blog blog={blog} />
    )

    const toggleB = component.container.querySelector('.toggleB')
    fireEvent.click(toggleB)

    expect(component.container).toHaveTextContent(
        'urliurli', 0
    )
})

test('click like 2 times, event handler is called 2 times', async() => {
    const blog = {
        title: 'otsikko',
        author: 'kirjoittaja',
        url: 'urliurli',
        likes: 0,
        user : 'peksi'
    }

    const addLike = jest.fn()

    const  component  = render(
        <Blog blog={blog}  addLike={addLike}/>
    )

    const toggleB = component.container.querySelector('.toggleB')
    fireEvent.click(toggleB)
    const likeB = component.container.querySelector('.likeB')
    fireEvent.click(likeB)
    fireEvent.click(likeB)

    expect(addLike.mock.calls).toHaveLength(2)
})
