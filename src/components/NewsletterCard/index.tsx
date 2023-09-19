import { NewsletterPost } from '@app/src/services/graphql/types';
import { FC, useState } from 'react';
import { css, styled } from 'styled-components';
import Typography from '../Typography/Typography';
import CoverImage from '../CoverImage';
import Sidebar from '../Sidebar/Sidebar';
import MarkdownConfig from '../MarkdownConfig/MarkdownConfig';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const Card = styled(Link)<{ background?: string; stack: number; $isActive: boolean }>`
  display: flex;
  padding: 20px 10px;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  border-radius: 10px;
  background-color: ${({ background }) => background || '#F6F092'};
  left: 0px;
  margin-right: -150px;
  width: 100%;
  min-height: 350px;
  max-width: 250px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  scroll-margin-right: 150px;
  z-index: ${({ stack }) => `calc(2 - ${stack})`};

  ${({ $isActive, stack }) =>
    $isActive &&
    css`
      z-index: ${`calc(2 - ${stack} + 5)`} !important;
      transition: all 0.1s ease-in-out;
      -webkit-filter: brightness(1);
      filter: brightness(1);

      & ~ a {
        -webkit-filter: brightness(0.7);
        filter: brightness(0.7);
      }
    `}

  ${({ theme }) => theme.media('sm')`
    transition: 0.4s ease-out;
    position: relative;
    max-width: 320px;
    min-height: 400px;
    
    &:hover {
      transition: 0.4s all ease-in-out;
      cursor: pointer;
    }
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
  isActiveCard: boolean;
};

const NewsletterCard: FC<Props> = ({ post, stack, isActiveCard }) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      <Card
        background={post.backgroundColour.value}
        stack={stack}
        scroll={false}
        href={`/?slug=${post.slug}`}
        $isActive={isActiveCard}
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
