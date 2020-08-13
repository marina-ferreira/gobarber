import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiPower, FiClock } from 'react-icons/fi'
import DayPicker from 'react-day-picker'
import PropTypes from 'prop-types'
import { isToday, format, parseISO, isAfter } from 'date-fns'

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
    modifiers.available && !modifiers.disabled && setSelectedDate(day)
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

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date())
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

              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
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

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Next Appointments</strong>
              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hour}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Morning</strong>

            {morningAppointments.length === 0 && (
              <p>There are no appointments for this morning</p>
            )}

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

            {morningAppointments.length === 0 && (
              <p>There are no appointments for this afternoon</p>
            )}

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
