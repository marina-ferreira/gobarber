import React from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import Button from 'components/Button'
import Input from 'components/Input'

import logo from 'assets/logo.svg'
import { Container, Content, Background } from './styles'

const SignIn = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />

        <form>
          <h1>Faça seu Login</h1>

          <Input name="email" type="email" icon={FiMail} placeholder="Email" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </form>

        <a href="forgot">
          <FiLogIn />
          Criar conta
        </a>
      </Content>

      <Background />
    </Container>
  )
}

export default SignIn
