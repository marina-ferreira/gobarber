import { renderHook } from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'

import { useAuth } from 'hooks'
import AuthProvider from 'providers/AuthProvider'
import api from 'services/api'

const apiMock = new MockAdapter(api)

describe('useAuth Hook', () => {
  it('should be able to sign in', async () => {
    const email = 'johndoe@email.com'

    apiMock.onPost('sessions').reply(200, {
      user: {
        id: 'user123',
        name: 'John Doe',
        email
      },
      token: 'token-123'
    })

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    result.current.signIn({ email, password: '123456' })
    await waitForNextUpdate()

    expect(result.current.user.email).toEqual(email)
  })

  it('should store user info in local storage', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')
    const apiResponse = {
      user: {
        id: 'user123',
        name: 'John Doe',
        email: 'johndoe@email.com'
      },
      token: 'token-123'
    }

    apiMock.onPost('sessions').reply(200, apiResponse)

    const {
      user: { email },
      token
    } = apiResponse
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    result.current.signIn({ email, password: '123456' })
    await waitForNextUpdate()

    expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:token', token)
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user)
    )
    expect(result.current.user.email).toEqual(email)
  })
})
