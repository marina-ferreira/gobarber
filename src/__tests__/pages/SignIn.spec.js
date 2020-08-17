import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'

import SignIn from 'pages/SignIn'

const mockedHistoryPush = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }) => children,
    useHistory: () => ({
      push: mockedHistoryPush
    })
  }
})

jest.mock('hooks', () => {
  return {
    useAuth: () => ({
      signIn: jest.fn()
    }),
    useToast: () => ({
      showToast: jest.fn()
    })
  }
})

describe('Sign In Page', () => {
  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />)

    const emailField = getByPlaceholderText('Email')
    const passwordField = getByPlaceholderText('Password')
    const buttonElement = getByText('Sign In')

    fireEvent.change(emailField, { target: { value: 'johndoe@email.com' } })
    fireEvent.change(passwordField, { target: { value: '123456' } })
    fireEvent.click(buttonElement)

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard')
    })
  })
})
