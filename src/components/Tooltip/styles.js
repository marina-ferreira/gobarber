import styled from 'styled-components'

import { appColors } from 'styles/global'

const { bg } = appColors

export const Container = styled.div`
  position: relative;

  span {
    width: 200px;
    left: 50%;
    bottom: calc(100% + 12px);
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    transition: opacity 0.4s, visibility 0.4s;
    transform: translateX(-50%);
    background: ${bg.button};
    color: ${bg.body};

    &::before {
      content: '';
      top: 100%;
      left: 50%;
      position: absolute;
      border-color: ${bg.button} transparent;
      border-style: solid;
      border-width: 6px 6px 0 6px;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`
