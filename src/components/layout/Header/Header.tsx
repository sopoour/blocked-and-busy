import React from 'react';
import Logo from './logo_blocked.svg';
import { styled } from 'styled-components';

const HeaderWrapper = styled.nav`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1000;
  min-height: 64px;
  padding: 0 40px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: transparent;
`;

const Header: React.FC = () => (
  <HeaderWrapper>
    <div />
    <Logo />
    <button style={{ fontSize: '16px', fontWeight: '700' }}>ABOUT</button>
  </HeaderWrapper>
);

export default Header;
