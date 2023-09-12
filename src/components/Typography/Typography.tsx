import styled from 'styled-components';

type TextAlign = 'center' | 'start' | 'end';

type FontWeight = 400 | 500 | 600 | 700 | 900;

export interface Props {
  className?: string;
  fontSize?: string;
  fontSizeSm?: string;
  type?: string;
  lineHeight?: string;
  textalign?: TextAlign;
  fontWeight?: FontWeight;
  color?: string;
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces';
  $isUpperCase?: boolean;
}

const Typography = styled.p<Props>`
  margin: 0;
  font-size: ${(props) => props.fontSize || '16px'};
  font-family: ${(props) => props.type};
  line-height: ${(props) => props.lineHeight || '1.5'};
  text-align: ${(props) => props.textalign || 'start'};
  font-weight: ${(props) => props.fontWeight || 700};
  color: ${(props) => props.color || props.theme.fg.default};
  white-space: ${(props) => props.whiteSpace || 'pre-wrap'};
  text-transform: ${(props) => (props.$isUpperCase ? 'uppercase' : 'none')};
`;

export default Typography;
