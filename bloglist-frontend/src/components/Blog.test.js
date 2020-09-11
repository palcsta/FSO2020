import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'

test('renders title and author', () => {
    const blog = {
        author: "testing author",
        title: "Component testing is done with react-testing-library",
        url: "blog.url_test",
        likes: 0

    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
        'testing author'
    )
})


test('clicking the button show url and likes', async () => {
    const blog = {
        author: "testing author",
        title: "Component testing is done with react-testing-library",
        url: "blog.url_test",
        likes: 0

    }

    const component = render(
        <Blog blog={blog} />
    )

    const button = component.getByText('info')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        "blog.url_test"

    )
    expect(component.container).toHaveTextContent(
        "likes"

    )
})
//my program is set not to allowing clicking like button twice
test('clicking the button show url and likes na clicking on like button', async () => {
    const blog = {
        author: "like",
        title: "Component testing is done with react-testing-library",
        url: "blog.url_test",
        likes: 0

    }

    const component = render(
        <Blog blog={blog} />
    )

    const button = component.getByText('info')
    fireEvent.click(button)

    const button2 = component.getByText('like!')
    fireEvent.click(button2)

    expect(component.container).toHaveTextContent(
        "likes: 1"

    )
    
})