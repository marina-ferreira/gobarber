import React, { useState, useCallback, useRef } from 'react'
import { FiLogIn, FiMail } from 'react-icons/fi'
import { Form } from '@unform/web'
import { Link } from 'react-router-dom'

import * as Yup from 'yup'

import getValidationErrors from 'utils/getValidationErrors'
import { useToast } from 'hooks'
import api from 'services/api'

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
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async data => {
      formRef.current && formRef.current.setErrors({})

      try {
        setLoading(true)

        await schema.validate(data, {
          abortEarly: false
        })

        await api.post('/passwords/forgot', { email: data.email })

        showToast({
          type: 'success',
          title: 'Recover password email has been sent',
          description:
            'An email has been sent to the provided address to confirm password recover.'
        })
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
      } finally {
        setLoading(false)
      }
    },
    [showToast]
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

            <Button type="submit" loading={loading}>
              Recover
            </Button>
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
