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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MarkdownConfig from '../components/MarkdownConfig/MarkdownConfig';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 0 32px 0;

  ${({ theme }) => theme.media('sm')`
    padding: 30px 0 48px 0;
  `}
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${Card}:last-of-type {
    margin-bottom: unset;
  }

  ${({ theme }) => theme.media('sm')`
    flex-direction: row;
    ${Card}:not(:first-of-type):hover {
      transform: translate(160px, -25px);
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
  const [open, setOpen] = useState<boolean>(false);
  const [linkedPost, setLinkedPost] = useState<NewsletterPost>();
  const { data, isLoading } = useSWR<NewsletterPost[] | null>('/api/posts', fetcher);
  const router = useRouter();
  const { slug } = router.query;
  const { data: descriptionData } = useSWR<GeneralContent | null>('/api/general', fetcher);
  const description = descriptionData?.pageDescription;

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

  return (
    <Root>
      <TopWrapper>
        {description && <Typography textalign="center">{description}</Typography>}
        <SignupForm />
      </TopWrapper>
      <CardWrapper>
        {data?.map((post, index) => <NewsletterCard post={post} stack={index} key={post.slug} />)}
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
