import React, { useCallback, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'

import * as Yup from 'yup'

import api from 'services/api'
import { useToast, useAuth } from 'hooks'

import getValidationErrors from 'utils/getValidationErrors'

import Button from 'components/Button'
import Input from 'components/Input'

import { Container, Content, AvatarInput } from './styles'

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().min(6)
})

const Profile = () => {
  const formRef = useRef(null)
  const { showToast } = useToast()
  const { user, updateUser } = useAuth()
  const history = useHistory()

  const handleSubmit = useCallback(
    async data => {
      formRef.current && formRef.current.setErrors({})

      try {
        await schema.validate(data, { abortEarly: false })
        await api.post('/users', data)

        history.push('/')

        showToast({
          type: 'success',
          title: 'Sign up successful',
          description: 'You can sign in now'
        })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current && formRef.current.setErrors(errors)
          return
        }

        showToast({
          type: 'error',
          title: 'Authentication Error',
          description: 'Sign in failed. Invalid credentials.'
        })
      }
    },
    [history, showToast]
  )

  const handleAvatarChange = useCallback(
    e => {
      const data = new FormData()
      const file = e.target.files[0]

      if (!file) return

      data.append('avatar', file)

      api
        .patch('/users/avatar', data)
        .then(response => {
          updateUser(response.data)
          showToast({ type: 'success', title: 'Avatar updated!' })
        })
        .catch(() => {
          showToast({ type: 'error', title: 'Avatar update error!' })
        })
    },
    [showToast, updateUser]
  )

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />

            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>My profile</h1>

          <Input name="name" type="text" icon={FiUser} placeholder="Name" />
          <Input name="email" type="email" icon={FiMail} placeholder="Email" />
          <Input
            name="old_password"
            type="password"
            icon={FiLock}
            placeholder="Current password"
            containerStyle={{ marginTop: 24 }}
          />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="New password"
          />
          <Input
            name="password_confirmation"
            type="password"
            icon={FiLock}
            placeholder="Confirm new password"
          />

          <Button type="submit">Save</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default Profile
