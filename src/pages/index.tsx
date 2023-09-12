import { getAllPosts } from '@app/src/lib/api';
import { GetServerSideProps, GetStaticPaths, NextPage } from 'next';
import MoreStories from '../more-stories';
import { NewsletterPost } from '../services/graphql/types';

type Props = {
  posts: NewsletterPost[];
};

const Page: NextPage<Props> = ({ posts }) => {
  return (
    <div className="container mx-auto px-5">
      <MoreStories morePosts={posts} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
};

export default Page;
