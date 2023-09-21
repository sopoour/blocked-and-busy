import { NextPage } from 'next';
import { GeneralContent, NewsletterPost } from '../services/graphql/types';
import useSWR from 'swr';
import Typography from '../components/Typography/Typography';
import { styled } from 'styled-components';
import NewsletterCard, { Card } from '../components/NewsletterCard';
import MaxWidthContainer from '../components/MaxWidthContainer';
import SignupForm from '../components/SignupForm';
import { fetcher } from '../hooks/fetch/useFetch';
import Sidebar from '../components/Sidebar/Sidebar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import MarkdownConfig from '../components/MarkdownConfig/MarkdownConfig';
import { useMedia } from '../hooks/useMedia';
import { Breakpoints } from '../styles/media';

const Root = styled.span`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 0 32px 0;

  ${({ theme }) => theme.media('sm')`
    padding: 30px 0 48px 0;
  `}
`;

const CardWrapper = styled.section`
  display: flex;
  height: 100%;
  width: 100%;
  z-index: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  ${({ theme }) => theme.media('sm')`
    ${Card}:not(:first-of-type):hover {
      transform: translateX(160px);
    }

    ${Card}:hover ~ ${Card} {
      position: relative;
      left: 130px;
      transition: 0.4s ease-out;
    }

  `}
`;

const TopWrapper = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const DetailContainer = styled.div`
  padding: 0 20px;
`;

const Page: NextPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isVisibleCard, setIsVisibleCard] = useState<number>(-1);
  const [linkedPost, setLinkedPost] = useState<NewsletterPost>();
  const { data, isLoading } = useSWR<NewsletterPost[] | null>('/api/posts', fetcher);
  const router = useRouter();
  const { slug } = router.query;
  const { data: descriptionData } = useSWR<GeneralContent | null>('/api/general', fetcher);
  const description = descriptionData?.pageDescription;
  const isDesktop = useMedia(Breakpoints.sm);

  useEffect(() => {
    if (
      typeof slug === 'string' &&
      data &&
      !isLoading &&
      !!data?.find((newsletter) => newsletter.slug === slug)
    ) {
      setOpen(true);
      setLinkedPost(data?.find((newsletter) => newsletter.slug === slug));
      delete router.query.slug;
      router.replace(router, undefined, { shallow: true });
    }
  }, [slug, isLoading, data]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    const scrollPosition = container?.scrollLeft;

    if (container?.children) {
      // Your logic to determine which card is in the viewport
      const cards = Array.from(container?.children); // Get all child elements
      cards.forEach((card, index) => {
        if (card instanceof HTMLElement) {
          const cardLeft = card.offsetLeft;
          const cardRight = cardLeft + card.clientWidth;

          if (scrollPosition && scrollPosition >= cardLeft - 50 && scrollPosition < cardRight) {
            setIsVisibleCard(index);
          }
        }
      });
    }
  }, [isVisibleCard]);

  useEffect(() => {
    // Attach the scroll event listener to the container
    const containerElement = containerRef.current;
    containerElement?.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      containerElement?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Root>
      <TopWrapper>
        {description && <Typography textalign="center">{description}</Typography>}
        <SignupForm />
      </TopWrapper>
      <CardWrapper ref={containerRef}>
        {data?.map((post, index) => (
          <NewsletterCard
            post={post}
            stack={index}
            key={post.slug}
            isActiveCard={isVisibleCard === index && !isDesktop}
          />
        ))}
      </CardWrapper>
      <Sidebar
        side="left"
        open={open}
        onClose={() => setOpen(false)}
        backgroundColor={linkedPost?.backgroundColour.value}
      >
        <DetailContainer>
          <MarkdownConfig content={linkedPost?.mainContent as string} />
        </DetailContainer>
      </Sidebar>
    </Root>
  );
};

export default Page;
