import { createGlobalStyle } from 'styled-components'

export const appColors = {
  text: {
    offWhite: '#f4ede8',
    button: '#312e38',
    placeholder: '#666360',
    error: '#c53030',
    tooltip: {
      info: '#ebf8ff',
      success: '#e6fff1',
      error: '#fddede'
    }
  },
  bg: {
    body: '#312e38',
    button: '#ff9000',
    input: '#232129',
    tooltip: {
      info: '#3172b7',
      success: '#2e656a',
      error: '#c53030'
    }
  }
}

const { text, bg } = appColors

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  body {
    color: ${text.offWhite};
    background: ${bg.body};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  button {
    &:focus {
      outline: 1px solid ${bg.button};
    }
  }

  button {
    cursor: pointer;
  }

  input {
    outline: 0;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: none;
    background: ${bg.input};
    -webkit-text-fill-color: ${text.offWhite};
    -webkit-box-shadow: 0 0 0px 1000px ${bg.input} inset;
    box-shadow: 0 0 0px 1000px ${bg.input} inset;
  }
`
