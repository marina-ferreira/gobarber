import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'

import SignIn from 'pages/SignIn'

const mockedHistoryPush = jest.fn()
const mockedShowToast = jest.fn()
const mockedSignIn = jest.fn()

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
      signIn: mockedSignIn
    }),
    useToast: () => ({
      showToast: mockedShowToast
    })
  }
})

describe('Sign In Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear()
  })

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

  it('should not be able to sign in with an invalid email', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />)

    const emailField = getByPlaceholderText('Email')
    const passwordField = getByPlaceholderText('Password')
    const buttonElement = getByText('Sign In')

    fireEvent.change(emailField, {
      target: { value: 'invalid-email' }
    })
    fireEvent.change(passwordField, { target: { value: '123456' } })
    fireEvent.click(buttonElement)

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled()
    })
  })

  it('should not be able to sign in', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error()
    })

    const { getByPlaceholderText, getByText } = render(<SignIn />)

    const emailField = getByPlaceholderText('Email')
    const passwordField = getByPlaceholderText('Password')
    const buttonElement = getByText('Sign In')

    fireEvent.change(emailField, {
      target: { value: 'johndoe@email.com' }
    })
    fireEvent.change(passwordField, { target: { value: '123456' } })
    fireEvent.click(buttonElement)

    await wait(() => {
      expect(mockedShowToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' })
      )
    })
  })
})
