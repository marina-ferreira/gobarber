import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

import signInBg from 'assets/sign-in-bg.png'
import { appColors } from 'styles/global'

const { text, bg } = appColors

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`

export const Content = styled.div`
  width: 100%;
  max-width: 700px;
`

export const Background = styled.div`
  flex: 1;
  background: url(${signInBg}) no-repeat center;
  background-size: cover;
`

export const AnimationContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      display: block;
      color: ${text.offWhite};
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, text.offWhite)};
      }
    }
  }

  > a {
    color: ${bg.button};
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, text.offWhite)};
    }
  }
`
