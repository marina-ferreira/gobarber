import React, { useCallback, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Form } from '@unform/web'

import * as Yup from 'yup'

import api from 'services/api'
import { useToast } from 'hooks'

import getValidationErrors from 'utils/getValidationErrors'

import Button from 'components/Button'
import Input from 'components/Input'

import logo from 'assets/logo.svg'
import { Container, Content, Background, AnimationContainer } from './styles'

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().min(6)
})

const SignUp = () => {
  const formRef = useRef(null)
  const { showToast } = useToast()
  const { history } = useHistory()

  const handleSubmit = useCallback(
    async data => {
      formRef.current && formRef.current.setErrors({})

      try {
        await schema.validate(data, { abortEarly: false })
        await api.post('/users', data)

        history.push('/')

        showToast({
          type: 'success',
          title: 'Sign up successful',
          description: 'You can sign in now'
        })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current && formRef.current.setErrors(errors)
          return
        }

        showToast({
          type: 'error',
          title: 'Authentication Error',
          description: 'Sign in failed. Invalid credentials.'
        })
      }
    },
    [history, showToast]
  )

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Register an account</h1>

            <Input name="name" type="text" icon={FiUser} placeholder="Name" />
            <Input
              name="email"
              type="email"
              icon={FiMail}
              placeholder="Email"
            />
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />

            <Button type="submit">Sign Up</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Back to Sign In
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp
