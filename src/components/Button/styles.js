import styled from 'styled-components'
import { shade } from 'polished'

import { appColors } from 'styles/global'

const { text, bg } = appColors

export const StyledButton = styled.button`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  margin-top: 16px;
  border: 0;
  color: ${text.button};
  transition: background 0.2s;
  border-radius: 5px;
  background: ${bg.button};

  &:hover {
    background: ${shade(0.2, bg.button)};
  }
`
