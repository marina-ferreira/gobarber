import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { Link } from 'react-router-dom'

import * as Yup from 'yup'

import getValidationErrors from 'utils/getValidationErrors'
import { useAuth, useToast } from 'hooks'

import Button from 'components/Button'
import Input from 'components/Input'

import logo from 'assets/logo.svg'
import { Container, Content, Background, AnimationContainer } from './styles'

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required()
})

const SignIn = () => {
  const formRef = useRef(null)
  const { signIn } = useAuth()
  const { showToast } = useToast()

  const handleSubmit = useCallback(
    async data => {
      formRef.current && formRef.current.setErrors({})

      try {
        await schema.validate(data, {
          abortEarly: false
        })

        await signIn(data)
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
    [signIn, showToast]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Sign in</h1>

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

            <Button type="submit">Sign In</Button>

            <a href="forgot">Forgot my password</a>
          </Form>

          <Link to="/sign-up">
            <FiLogIn />
            Sign Up
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn
