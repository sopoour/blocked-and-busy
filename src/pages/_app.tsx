import React from 'react';
import { AppProps } from 'next/app';

import { GlobalStyle } from '../styles/global';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('@app/src/components/layout/Layout'));

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
