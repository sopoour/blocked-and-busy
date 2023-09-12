import { getAllPosts, getGeneralContent } from '@app/src/lib/api';
import { GetServerSideProps, NextPage } from 'next';
import { Maybe, NewsletterPost } from '../services/graphql/types';
import Typography from '../components/Typography/Typography';
import { styled } from 'styled-components';
import NewsletterCard, { Card } from '../components/NewsletterCard';

const CardWrapper = styled.div`
  display: flex;
  padding: 40px;
  ${Card}:first-of-type {
    margin-left: 0;
  }
`;

type Props = {
  posts: NewsletterPost[];
  description?: Maybe<string>;
};

const Page: NextPage<Props> = ({ posts, description }) => {
  return (
    <div className="container mx-auto px-5">
      {description && <Typography textalign="center">{description}</Typography>}
      <CardWrapper>
        {posts.map((post) => (
          <NewsletterCard post={post} />
        ))}
      </CardWrapper>
    </div>
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
