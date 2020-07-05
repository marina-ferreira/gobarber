import styled from 'styled-components'

import { appColors } from 'styles/global'

const { text, bg } = appColors

const toastTypeVariations = {
  info: {
    color: text.tooltip.info,
    background: bg.tooltip.info
  },
  success: {
    color: text.tooltip.success,
    background: bg.tooltip.success
  },
  error: {
    color: text.tooltip.error,
    background: bg.tooltip.error
  }
}

export const Container = styled.div`
  top: 0;
  right: 0;
  padding: 30px;
  position: absolute;
  overflow: hidden;
`

export const Content = styled.div`
  width: 360px;
  padding: 16px 30px 16px 16px;
  display: flex;
  border-radius: 10px;
  position: relative;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  background: ${bg.tooltip.info};
  color: ${text.tooltip.info};

  ${({ type }) => toastTypeVariations[type] || 'info'}

  > svg {
    margin: 4px 12px 00;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    right: 8px;
    top: 8px;
    opacity: 0.6;
    border: 0;
    position: absolute;
    color: inherit;
    background: transparent;

    &:focus {
      outline: 1px solid ${bg.button};
    }
  }
`
