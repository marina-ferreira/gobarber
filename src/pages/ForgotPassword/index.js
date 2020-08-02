import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail } from 'react-icons/fi'
import { Form } from '@unform/web'
import { Link, useHistory } from 'react-router-dom'

import * as Yup from 'yup'

import getValidationErrors from 'utils/getValidationErrors'
import { useToast } from 'hooks'

import Button from 'components/Button'
import Input from 'components/Input'

import logo from 'assets/logo.svg'
import { Container, Content, Background, AnimationContainer } from './styles'

const schema = Yup.object().shape({
  email: Yup.string().required().email()
})

const ForgotPassword = () => {
  const formRef = useRef(null)
  const { showToast } = useToast()
  const { history } = useHistory()

  const handleSubmit = useCallback(
    async data => {
      formRef.current && formRef.current.setErrors({})

      try {
        await schema.validate(data, {
          abortEarly: false
        })

        history.push('/dashboard')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current && formRef.current.setErrors(errors)
          return
        }

        showToast({
          type: 'error',
          title: 'Recover Password Error',
          description: 'An error occured on password recover. Try again.'
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
            <h1>Recover Password</h1>

            <Input
              name="email"
              type="email"
              icon={FiMail}
              placeholder="Email"
            />

            <Button type="submit">Recover</Button>
          </Form>

          <Link to="/sign-in">
            <FiLogIn />
            Back to sign in
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ForgotPassword
