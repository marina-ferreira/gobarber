import React, { useCallback, useRef } from 'react'
import { FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { useHistory } from 'react-router-dom'

import * as Yup from 'yup'

import getValidationErrors from 'utils/getValidationErrors'
import { useToast } from 'hooks'
import api from 'services/api'

import Button from 'components/Button'
import Input from 'components/Input'

import logo from 'assets/logo.svg'
import { Container, Content, Background, AnimationContainer } from './styles'

const schema = Yup.object().shape({
  password: Yup.string().required(),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  )
})

const ResetPassword = () => {
  const formRef = useRef(null)
  const { showToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async data => {
      formRef.current && formRef.current.setErrors({})

      try {
        await schema.validate(data, {
          abortEarly: false
        })

        const { password, password_confirmation } = data
        const token = history.location.search.replace('?token=', '')

        if (!token) throw new Error()

        api.post('/passwords/reset', {
          token,
          password,
          password_confirmation
        })

        history.push('/')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current && formRef.current.setErrors(errors)
          return
        }

        showToast({
          type: 'error',
          title: 'Reset Password Error',
          description: 'An error ocurred on reset password. Try again.'
        })
      }
    },
    [showToast, history]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Reset Password</h1>

            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="New password"
            />

            <Input
              name="password_confirmation"
              type="password"
              icon={FiLock}
              placeholder="Confirm password"
            />

            <Button type="submit">Reset</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ResetPassword
