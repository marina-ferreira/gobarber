import styled from 'styled-components'
import { shade } from 'polished'

import { appColors } from 'styles/global'

const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: ${appColors.bg.header};
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Caption {
    padding: 15px 20px;
    margin: -16px -16px 10px;
    text-align: center;
    border-radius: 5px 5px 0 0;
    background: ${appColors.bg.panel};
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: ${appColors.bg.panel};
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, appColors.bg.panel)};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: ${appColors.text.placeholder} !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: ${appColors.bg.button} !important;
    border-radius: 10px;
    color: ${appColors.bg.input} !important;
  }
`

export default Calendar
