import React from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'

import Button from 'components/Button'
import Input from 'components/Input'

import logo from 'assets/logo.svg'
import { Container, Content, Background } from './styles'

const SignUp = () => {
  return (
    <Container>
      <Background />

      <Content>
        <img src={logo} alt="GoBarber" />

        <form>
          <h1>Register an account</h1>

          <Input name="name" type="text" icon={FiUser} placeholder="Name" />
          <Input name="email" type="email" icon={FiMail} placeholder="Email" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />

          <Button type="submit">Sign Up</Button>
        </form>

        <a href="forgot">
          <FiArrowLeft />
          Sign In
        </a>
      </Content>
    </Container>
  )
}

export default SignUp
