import styled from 'styled-components'
import { shade } from 'polished'

import signInBg from 'assets/sign-in-bg.png'
import { appColors } from 'styles/global'

const {
  text: { button: textButton, offWhite, placeholder: textPlaceholder },
  bg: { button: buttonBg, input: inputBg }
} = appColors

console.log(offWhite)

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`

export const Content = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    input,
    button {
      border-radius: 5px;
    }

    input {
      width: 100%;
      padding: 16px;
      border: 2px solid ${inputBg};
      color: ${offWhite};
      background: ${inputBg};

      & + input {
        margin-top: 8px;
      }

      &::placeholder {
        color: ${textPlaceholder};
      }
    }

    button {
      width: 100%;
      height: 56px;
      padding: 0 16px;
      margin-top: 16px;
      border: 0;
      color: ${textButton};
      transition: background 0.2s;
      background: ${buttonBg};

      &:hover {
        background: ${shade(0.2, buttonBg)};
      }
    }

    a {
      display: block;
      color: ${offWhite};
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, offWhite)};
      }
    }
  }

  > a {
    color: ${buttonBg};
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, offWhite)};
    }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${signInBg}) no-repeat center;
  background-size: cover;
`
