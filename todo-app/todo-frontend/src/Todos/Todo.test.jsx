import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Todo } from './List'

const todos = [{"_id":"68b1938012c7e57a7d89b03d","text":"Write code","done":true},{"_id":"68b1938012c7e57a7d89b03e","text":"Learn about containers","done":false}]
describe('<Todo />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Todo todo={todos[0]} onClickDelete={() => {console.log(2)}} onClickComplete={() => {console.log(3)}} />
    ).container
  })

  test('a Todo is rendered', () => {
    screen.getByText("Write code")
  })
})
