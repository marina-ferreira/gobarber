import React from 'react'
import { FiPower } from 'react-icons/fi'

import { useAuth } from 'hooks'
import logo from 'assets/logo.svg'
import { Container, Header, HeaderContent, Profile } from './styles'

const Dashboard = () => {
  const { signOut, user } = useAuth()

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Welcome,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  )
}

export default Dashboard
