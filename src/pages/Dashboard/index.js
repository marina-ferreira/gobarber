import React, { useState } from 'react'
import { FiPower, FiClock } from 'react-icons/fi'

import { useAuth } from 'hooks'
import logo from 'assets/logo.svg'
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar
} from './styles'

const Dashboard = () => {
  const { signOut, user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date())

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

      <Content>
        <Schedule>
          <h1>Scheduled Appointments</h1>

          <p>
            <span>Today</span>
            <span>Day 7</span>
            <span>Monday</span>
          </p>

          <NextAppointment>
            <strong>Next Appointments</strong>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/4058722?s=460&u=aa7ccd0559a5e7265c0c29dc5e98e3503cfc0962&v=4"
                alt="Marina Ferreira"
              />
              <strong>Next Appointments</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Morning</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://github.com/marina-ferreira.png"
                  alt="Marina Ferreira"
                />

                <strong>Marina Ferreira</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://github.com/marina-ferreira.png"
                  alt="Marina Ferreira"
                />

                <strong>Marina Ferreira</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Afternoon</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://github.com/marina-ferreira.png"
                  alt="Marina Ferreira"
                />

                <strong>Marina Ferreira</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://github.com/marina-ferreira.png"
                  alt="Marina Ferreira"
                />

                <strong>Marina Ferreira</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  )
}

export default Dashboard
