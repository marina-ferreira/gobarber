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
export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`
export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: ${appColors.bg.button};
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      margin: 0 8px;
      background: ${appColors.bg.button};
    }
  }
`
export const NextAppointment = styled.div`
  margin-top: 64px;

  strong: {
    color: ${appColors.text.icon};
    font-size: 20px;
    font-weight: 400;
  }

  div {
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;
    background: ${appColors.bg.panel};

    &::before {
      content: '';
      width: 1px;
      height: 80%;
      top: 10px;
      left: 0;
      position: absolute;
      background: ${appColors.bg.button};
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: ${appColors.text.offWhite};
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: ${appColors.text.icon};

      svg {
        color: ${appColors.bg.button};
        margin-right: 8px;
        margin-top: 2px;
      }
    }
  }
`
export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: ${appColors.text.icon};
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid ${appColors.bg.panel};
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`
export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: ${appColors.text.offWhite};

    svg {
      color: ${appColors.bg.button};
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;
    background: ${appColors.bg.panel};

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      font-size: 20px;
      color: ${appColors.text.offWhite};
    }
  }
`
