import styled from 'styled-components'

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

  & + div {
    margin-top: 8px;
  }

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
