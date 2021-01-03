import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'



//Attention!!!!
//this test will work only if BlogForm's wantBlog state is set to true(it is false by default)
test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )
    console.log(component)

  
  const form = component.container.querySelector('#formi')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const title = component.container.querySelector('#title')
  //const button2 = component.getByText('Add a blog!')
   // console.log("button printing",button2)
    //console.log("form, ",author)
  //  console.log("printing form", form)
  fireEvent.change(author, { target: { value: 'testing of forms could be easier' } })
  fireEvent.change(url, { target: { value: 'testing of forms could be easier' } })
  fireEvent.change(title, { target: { value: 'testing of forms could be easier' } })
  fireEvent.submit(form)
  //fireEvent.click(button2)

   // console.log(createBlog.mock.calls)


  expect(createBlog.mock.calls.length).toBe(1)
  //console.log(JSON.stringify(createNote.mock.calls[0][0].content, null, 2))
  expect(createBlog.mock.calls[0][0].author).toBe('testing of forms could be easier' )
})