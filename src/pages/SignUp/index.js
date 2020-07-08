import React, { useCallback, useRef } from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Form } from '@unform/web'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

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

  const handleSubmit = useCallback(async data => {
    formRef.current && formRef.current.setErrors({})

    try {
      await schema.validate(data, {
        abortEarly: false
      })
    } catch (error) {
      const errors = getValidationErrors(error)
      formRef.current && formRef.current.setErrors(errors)
    }
  }, [])

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
