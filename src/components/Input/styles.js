import styled, { css } from 'styled-components'

import { appColors } from 'styles/global'

const { text, bg } = appColors

export const Container = styled.div`
  width: 100%;
  padding: 16px;
  border: 2px solid ${bg.input};
  background: ${bg.input};
  display: flex;
  align-items: center;
  color: ${text.placeholder};
  border-radius: 5px;

  & + div {
    margin-top: 8px;
  }

  ${({ isFocused }) =>
    isFocused &&
    css`
      color: ${bg.button};
      border-color: ${bg.button};
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      color: ${bg.button};
    `}

  input {
    flex: 1;
    border: 0;
    color: ${text.offWhite};
    background: transparent;

    &::placeholder {
      color: ${text.placeholder};
    }
  }

  svg {
    margin-right: 16px;
  }
`
