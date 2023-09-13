import { getAllPosts, getGeneralContent } from '@app/lib/api';
import { GetServerSideProps, NextPage } from 'next';
import { Maybe, NewsletterPost } from '../services/graphql/types';
import Typography from '../components/Typography/Typography';
import { styled } from 'styled-components';
import NewsletterCard, { Card } from '../components/NewsletterCard';
import MaxWidthContainer from '../components/MaxWidthContainer';
import SignupForm from '../components/SignupForm';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 48px 0;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 48px;
  height: 100%;
  ${({ theme }) => theme.media('sm')`
    flex-direction: row;

    ${Card}:hover {
      transition: 0.4s all ease-in-out;
      transform: translateY(-25px);
      cursor: pointer;
    }

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
  padding: 20px 0;
`;

type Props = {
  posts: NewsletterPost[];
  description?: Maybe<string>;
};

const Page: NextPage<Props> = ({ posts, description }) => {
  return (
    <Root>
      <TopWrapper>
        {description && <Typography textalign="center">{description}</Typography>}
        <SignupForm />
      </TopWrapper>
      <CardWrapper>
        {posts.map((post, index) => (
          <NewsletterCard post={post} stack={index} />
        ))}
      </CardWrapper>
    </Root>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const posts = await getAllPosts();
  const description = await getGeneralContent();

  return {
    props: {
      posts,
      description: description?.pageDescription,
    },
  };
};

export default Page;
