import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Fonts from './components/Fonts';



const fonts = {
  fonts: {
    heading: 'Clash display, sans-serif',
    body: 'Poppins',
  },
  colors: {
    primary: "#E9FB8E",
    text: "#DEDFD8",
    black: "#010101",
  }
}

const theme = extendTheme( fonts );

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} >
      <Fonts />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
