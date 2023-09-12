import { FC } from 'react';
import { styled } from 'styled-components';

const FooterWrapper = styled.footer`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: black;
  color: white;
`;

const FooterType = styled.p`
  color: white;
  font-size: 22px;
  text-transform: uppercase;
`;

const Footer: FC = () => {
  return (
    <FooterWrapper>
      <FooterType>Footer with - If qestions. Other SoMe etc. </FooterType>
    </FooterWrapper>
  );
};

export default Footer;
