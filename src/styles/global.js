import { createGlobalStyle } from 'styled-components'

export const appColors = {
  text: {
    offWhite: '#fafafa'
  },
  bg: {
    body: '#312e38'
  }
}

const { text, bg } = appColors

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`
