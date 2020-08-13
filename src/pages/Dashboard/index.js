import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { FiPower, FiClock } from 'react-icons/fi'
import DayPicker from 'react-day-picker'
import PropTypes from 'prop-types'
import { isToday, format } from 'date-fns'

import api from 'services/api'
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
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [monthAvailability, setMonthAvailability] = useState([])

  const handleDayClick = useCallback((day, modifiers) => {
    modifiers.available && setSelectedDate(day)
  }, [])

  const handleMonthChange = useCallback(maonth => {
    setCurrentMonth(maonth)
  }, [])

  useEffect(() => {
    const params = {
      year: currentMonth.getFullYear(),
      month: currentMonth.getMonth() + 1
    }

    api
      .get(`/providers/${user.id}/month-availability`, { params })
      .then(response => setMonthAvailability(response.data))
      .catch(error => console.log(error)) /* eslint-disable-line */
  }, [currentMonth, user.id])

  const disabledDays = useMemo(() => {
    return monthAvailability
      .filter(day => !day.available)
      .map(monthDay => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()
        return new Date(year, month, monthDay.day)
      })
  }, [currentMonth, monthAvailability])

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, 'MMMM do')
  }, [selectedDate])

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc')
  }, [selectedDate])

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
            {isToday(selectedDate) && <span>Today</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
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
            fromMonth={new Date()}
            selectedDays={selectedDate}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDayClick}
            onMonthChange={handleMonthChange}
            navbarElement={<Navbar />}
          />
        </Calendar>
      </Content>
    </Container>
  )
}

export default Dashboard

const Navbar = ({
  onPreviousClick,
  onNextClick,
  className,
  showPreviousButton
}) => {
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
      {showPreviousButton && (
        <button
          type="button"
          display="none"
          style={{ ...buttonStyles, ...buttonLeftStyles }}
          onClick={() => onPreviousClick()}
        >
          &#10132;
        </button>
      )}
      <button type="button" style={buttonStyles} onClick={() => onNextClick()}>
        &#10132;
      </button>
    </div>
  )
}

Navbar.propTypes = {
  className: PropTypes.string,
  showPreviousButton: PropTypes.bool,
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func
}

Navbar.defaultProps = {
  className: '',
  showPreviousButton: true,
  onPreviousClick: () => {},
  onNextClick: () => {}
}
