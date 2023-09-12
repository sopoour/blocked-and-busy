import Link from 'next/link';

import MoreStories from '../../../more-stories';
import Date from '../../../date';
import CoverImage from '../../../components/CoverImage';

import { Markdown } from '@app/src/lib/markdown';
import { getPostAndMorePosts } from '@app/src/lib/api';
import { GetServerSideProps, NextPage } from 'next';
import { NewsletterPost } from '@app/src/services/graphql/types';

type Props = {
  post: NewsletterPost;
  morePosts: NewsletterPost[];
};

const PostPage: NextPage<Props> = ({ post, morePosts }) => {
  return (
    <div className="container mx-auto px-5">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <article>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
          {post.title}
        </h1>
        <div className="hidden md:block md:mb-12"></div>
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={post.title ?? ''} url={post.picture?.url ?? ''} />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="block md:hidden mb-6"></div>
          <div className="mb-6 text-lg">
            <Date dateString={post.date} />
          </div>
        </div>

        {post.mainContent && (
          <div className="max-w-2xl mx-auto">
            <div className="prose">
              <Markdown content={post.mainContent} />
            </div>
          </div>
        )}
      </article>
      <hr className="border-accent-2 mt-28 mb-24" />
      <MoreStories morePosts={morePosts} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const { post, morePosts } = await getPostAndMorePosts(params?.slug as string);

  return {
    props: {
      post,
      morePosts,
    },
  };
};

export default PostPage;
