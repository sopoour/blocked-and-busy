import React, { FC, ReactNode } from 'react';
import Header from './Header/Header';
import { styled } from 'styled-components';
import Footer from './Footer';
import 'react-loading-skeleton/dist/skeleton.css';

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainLayout = styled.main`
  flex: 1;
  width: 100%;
  margin: 0 auto;
`;

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => (
  <Root>
    <Header />
    <MainLayout>{children}</MainLayout>
    <Footer />
  </Root>
);

export default Layout;
