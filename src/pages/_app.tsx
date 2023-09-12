import React from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import { GlobalStyle } from '../styles/global';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
