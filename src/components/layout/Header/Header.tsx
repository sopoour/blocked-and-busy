import React, { useState } from 'react';
import useSWR from 'swr';
import Logo from './logo_blocked.svg';
import { styled } from 'styled-components';
import Sidebar from '../../Sidebar/Sidebar';
import { GeneralContent } from '@app/src/services/graphql/types';
import { fetcher } from '@app/src/hooks/fetch/useFetch';
import MarkdownConfig from '../../MarkdownConfig/MarkdownConfig';

const HeaderWrapper = styled.nav`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1000;
  min-height: 64px;
  padding: 8px 20px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg.soft};

  ${({ theme }) => theme.media('sm')`
    padding: 16px 40px;
  `}
`;

const DesktopOnly = styled.div`
  display: none;
  ${({ theme }) => theme.media('sm')`
    display: block
  `}
`;

const AboutContainer = styled.div`
  padding: 0 20px;
`;

const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useSWR<GeneralContent | null>('/api/general', fetcher);

  return (
    <>
      <HeaderWrapper>
        <DesktopOnly />
        <Logo />
        <button
          style={{ fontSize: '16px', fontWeight: '700' }}
          onClick={() => setOpen((prev) => !prev)}
        >
          ABOUT
        </button>
      </HeaderWrapper>
      <Sidebar side="right" open={open} onClose={() => setOpen(false)}>
        <AboutContainer>
          <MarkdownConfig content={data?.about as string} />
        </AboutContainer>
      </Sidebar>
    </>
  );
};

export default Header;
