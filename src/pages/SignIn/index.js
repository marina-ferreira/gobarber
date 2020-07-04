import React from 'react'
import { FiLogIn } from 'react-icons/fi'

import logo from 'assets/logo.svg'
import { Container, Content, Background } from './styles'

const SignIn = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />

        <form>
          <h1>Faça seu Login</h1>

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />

          <button type="submit">Entrar</button>

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
