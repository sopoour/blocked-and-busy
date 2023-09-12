import { NewsletterPost } from '@app/src/services/graphql/types';
import { FC } from 'react';
import { styled } from 'styled-components';
import Typography from '../Typography/Typography';
import CoverImage from '../CoverImage';

export const Card = styled.div<{ background?: string }>`
  display: flex;
  padding: 20px 10px;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  border-radius: 10px;
  background-color: ${({ background }) => background || '#F6F092'};
  margin-left: -150px;
  max-width: 300px;
  min-height: 400px;
  z-index: 2;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  height: 100%;
  max-height: 200px;
`;

type Props = {
  post: NewsletterPost;
};

const NewsletterCard: FC<Props> = ({ post }) => {
  return (
    <Card background={post.backgroundColour.value}>
      <Header>
        <Typography $isUpperCase textalign="center">
          {post.title}
        </Typography>
        <CoverImage title={post.title || ''} url={post.picture?.url} />
      </Header>
      <Typography fontWeight={400}>{post.previewText}</Typography>
    </Card>
  );
};

export default NewsletterCard;
