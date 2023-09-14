import styled, { css } from 'styled-components';
import Close from './close.svg';

export const Header = styled.div<{ background?: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 5;
  justify-content: space-between;
  background-color: ${({ background }) => background};
  padding: 16px 20px;
`;

export const CloseButton = styled(Close)<{ side: 'left' | 'right' }>`
  display: flex;
  align-self: ${({ side }) => (side === 'left' ? 'flex-start' : 'flex-end')};
  :hover {
    cursor: pointer;
  }
`;
