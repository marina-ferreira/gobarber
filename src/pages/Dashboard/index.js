import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { FiPower, FiClock } from 'react-icons/fi'
import DayPicker from 'react-day-picker'
import PropTypes from 'prop-types'
import { isToday, format, parseISO } from 'date-fns'

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
  const [appointments, setAppointments] = useState([])

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

  useEffect(() => {
    const params = {
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1,
      day: selectedDate.getDate()
    }

    api
      .get('/appointments/schedule', { params })
      .then(response => {
        const formattedAppointments = response.data.map(appointment => ({
          ...appointment,
          hour: format(parseISO(appointment.date), 'HH:mm')
        }))

        setAppointments(formattedAppointments)
      })
      .catch(error => console.log(error)) /* eslint-disable-line */
  }, [selectedDate])

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

  const morningAppointments = useMemo(() => {
    return appointments.filter(
      appointment => parseISO(appointment.date).getHours() < 12
    )
  }, [appointments])

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(
      appointment => parseISO(appointment.date).getHours() >= 12
    )
  }, [appointments])

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

            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hour}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <strong>Afternoon</strong>

            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hour}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
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
