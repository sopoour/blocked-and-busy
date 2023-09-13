import { NewsletterPost } from '@app/src/services/graphql/types';
import { FC } from 'react';
import { styled } from 'styled-components';
import Typography from '../Typography/Typography';
import CoverImage from '../CoverImage';

export const Card = styled.div<{ background?: string; stack: number }>`
  display: flex;
  padding: 20px 10px;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  border-radius: 10px;
  background-color: ${({ background }) => background || '#F6F092'};
  margin-bottom: -100px;
  width: 100%;
  z-index: ${({ stack }) => `calc(2 - ${stack})`};
  transition: 0.4s ease-out;
  position: relative;
  left: 0px;

  ${({ theme }) => theme.media('sm')`
    margin-right: -150px;
    max-width: 320px;
    min-height: 400px;
  `}
`;

const Header = styled.div`
  display: flex;
  gap: 11px;
  height: 100vh;
  max-height: 200px;
  flex-direction: column-reverse;

  ${({ theme }) => theme.media('sm')`
    flex-direction: column;
  `}
`;

const PreviewText = styled(Typography)`
  display: none;
  ${({ theme }) => theme.media('sm')`
    display: block;
  `}
`;

type Props = {
  post: NewsletterPost;
  stack: number;
};

const NewsletterCard: FC<Props> = ({ post, stack }) => {
  return (
    <Card background={post.backgroundColour.value} stack={stack}>
      <Header>
        <Typography $isUpperCase textalign="center">
          {post.title}
        </Typography>
        <CoverImage title={post.title || ''} url={post.picture?.url} />
      </Header>
      <PreviewText fontWeight={400}>{post.previewText}</PreviewText>
    </Card>
  );
};

export default NewsletterCard;
