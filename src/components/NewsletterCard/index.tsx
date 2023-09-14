import { NewsletterPost } from '@app/src/services/graphql/types';
import { FC, useState } from 'react';
import { styled } from 'styled-components';
import Typography from '../Typography/Typography';
import CoverImage from '../CoverImage';
import Sidebar from '../Sidebar/Sidebar';
import MarkdownConfig from '../MarkdownConfig/MarkdownConfig';
import { useRouter } from 'next/router';

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

  &:hover {
    transition: 0.4s all ease-in-out;
    transform: translateY(-25px);
    cursor: pointer;
  }

  ${({ theme }) => theme.media('sm')`
    transition: 0.4s ease-out;
    position: relative;
    left: 0px;
    margin-right: -150px;
    margin-bottom: unset;
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

const DetailContainer = styled.div`
  padding: 0 20px;
`;

type Props = {
  post: NewsletterPost;
  stack: number;
};

const NewsletterCard: FC<Props> = ({ post, stack }) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      <Card
        background={post.backgroundColour.value}
        stack={stack}
        onClick={() => router.push(`/?slug=${post.slug}`)}
      >
        <Header>
          <Typography $isUpperCase textalign="center">
            {post.title}
          </Typography>
          <CoverImage title={post.title || ''} url={post.picture?.url} />
        </Header>
        <PreviewText fontWeight={400}>{post.previewText}</PreviewText>
      </Card>
      <Sidebar
        side="left"
        open={open}
        onClose={() => setOpen(false)}
        backgroundColor={post.backgroundColour.value}
      >
        <DetailContainer>
          <MarkdownConfig content={post.mainContent as string} />
        </DetailContainer>
      </Sidebar>
    </>
  );
};

export default NewsletterCard;
