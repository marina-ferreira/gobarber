import styled from 'styled-components'
import { appColors } from 'styles/global'

export const Container = styled.div``
export const Header = styled.header`
  padding: 32px 0;
  background: ${appColors.bg.header};
`
export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    &:hover {
      svg {
        color: ${appColors.bg.button};
      }
    }

    svg {
      width: 20px;
      height: 20px;
      color: ${appColors.text.icon};
      transition: color 0.1s;
    }
  }
`
export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }

  span {
    color: ${appColors.text.offWhite};
  }

  strong {
    color: ${appColors.bg.button};
  }
`
