import React, { useEffect, useState } from 'react';
import Logo from './logo_blocked.svg';
import { styled } from 'styled-components';
import Sidebar from '../../Sidebar/Sidebar';
import { getGeneralContent } from '@app/lib/api';
import { Markdown } from '@app/lib/markdown';
import { GeneralContent, GeneralContentAbout, Maybe } from '@app/src/services/graphql/types';

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

const AboutContainer = styled.div`
  padding: 0 20px;
`;

const Header: React.FC = () => {
  const [about, setAbout] = useState<Maybe<GeneralContentAbout>>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    getGeneralContent().then((response) => setAbout(response?.about));
  }, []);
  return (
    <HeaderWrapper>
      <div />
      <Logo />
      <button
        style={{ fontSize: '16px', fontWeight: '700' }}
        onClick={() => setOpen((prev) => !prev)}
      >
        ABOUT
      </button>
      <Sidebar side="right" open={open} onClose={() => setOpen(false)}>
        <AboutContainer>
          <Markdown content={about as GeneralContentAbout} />
        </AboutContainer>
      </Sidebar>
    </HeaderWrapper>
  );
};

export default Header;
