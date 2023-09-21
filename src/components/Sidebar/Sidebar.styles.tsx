import styled, { css } from 'styled-components';

export const Header = styled.nav<{ background?: string; side: 'left' | 'right' }>`
  width: 100%;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 5;
  justify-content: ${({ side }) => (side === 'left' ? 'flex-end' : 'flex-start')};
  background-color: ${({ background }) => background};
  padding: 16px 20px;
`;

export const CloseButton = styled.button<{ side: 'left' | 'right' }>`
  padding: 8px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
