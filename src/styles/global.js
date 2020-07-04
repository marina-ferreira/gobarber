import { createGlobalStyle } from 'styled-components'

export const appColors = {
  text: {
    offWhite: '#f4ede8',
    button: '#312e38',
    placeholder: '#666360'
  },
  bg: {
    body: '#312e38',
    button: '#ff9000',
    input: '#232129'
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

  input, button {
    &:focus {
      outline: 1px solid ${bg.button};
    }
  }

  button {
    cursor: pointer;
  }
`
