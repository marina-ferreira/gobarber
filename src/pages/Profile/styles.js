import styled from 'styled-components'
import { shade } from 'polished'

import { appColors } from 'styles/global'

const { text, bg } = appColors

export const Container = styled.div`
  > header {
    height: 144px;
    display: flex;
    align-items: center;
    background: ${bg.header};

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        width: 24px;
        height: 24px;
        color: ${text.icon};
      }
    }
  }
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: -160px auto 0;

  form {
    width: 340px;
    margin: 80px 0;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
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
`
export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 185px;
    height: 185px;
    border-radius: 50%;
    object-fit: cover;
  }

  label {
    width: 48px;
    height: 48px;
    right: 0;
    bottom: 0;
    display: flex;
    position: absolute;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    background: ${bg.button};
    transition: background-color 0.1s;

    &:hover {
      background: ${shade(0.2, bg.button)};
    }

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      margin: auto;
      color: ${text.button};
    }
  }
`
