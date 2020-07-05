import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import getValidationErrors from 'utils/getValidationErrors'
import { useAuth } from 'hooks'

import Button from 'components/Button'
import Input from 'components/Input'

import logo from 'assets/logo.svg'
import { Container, Content, Background } from './styles'

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required()
})

const SignIn = () => {
  const formRef = useRef(null)
  const { signIn } = useAuth()

  const handleSubmit = useCallback(
    async data => {
      formRef.current && formRef.current.setErrors({})

      try {
        await schema.validate(data, {
          abortEarly: false
        })

        signIn(data)
      } catch (error) {
        const errors = getValidationErrors(error)
        formRef.current && formRef.current.setErrors(errors)
      }
    },
    [signIn]
  )

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Sign in</h1>

          <Input name="email" type="email" icon={FiMail} placeholder="Email" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />

          <Button type="submit">Sign In</Button>

          <a href="forgot">Forgot my password</a>
        </Form>

        <a href="forgot">
          <FiLogIn />
          Sign Up
        </a>
      </Content>

      <Background />
    </Container>
  )
}

export default SignIn
