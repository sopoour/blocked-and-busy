import React from 'react';
import { styled } from 'styled-components';

const HeaderWrapper = styled.nav`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1000;
  min-height: 64px;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: grey;
`;

const Header: React.FC = () => <HeaderWrapper></HeaderWrapper>;

export default Header;
