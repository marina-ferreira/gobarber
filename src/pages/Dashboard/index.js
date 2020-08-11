import React, { useState } from 'react'
import { FiPower, FiClock } from 'react-icons/fi'
import DayPicker from 'react-day-picker'
import PropTypes from 'prop-types'

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
  Appointment
} from './styles'

import Calendar from './calendar.styles'
import 'react-day-picker/lib/style.css'

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
        <Calendar>
          <DayPicker
            weekdaysShort={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
            navbarElement={<Navbar />}
          />
        </Calendar>
      </Content>
    </Container>
  )
}

export default Dashboard

const Navbar = ({ onPreviousClick, onNextClick, className }) => {
  const buttonStyles = {
    width: 54,
    height: 54,
    right: 0,
    color: '#999591',
    fontSize: 16,
    border: 'none',
    position: 'absolute',
    background: 'transparent'
  }

  const buttonLeftStyles = {
    left: 0,
    right: 'auto',
    paddingBottom: 4,
    transform: 'rotate(180deg)'
  }

  return (
    <div className={className}>
      <button
        type="button"
        style={{ ...buttonStyles, ...buttonLeftStyles }}
        onClick={() => onPreviousClick()}
      >
        &#10132;
      </button>
      <button type="button" style={buttonStyles} onClick={() => onNextClick()}>
        &#10132;
      </button>
    </div>
  )
}

Navbar.propTypes = {
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  className: PropTypes.func.isRequired
}
