import { getAllPosts } from '@app/src/lib/api';
import { NextPage } from 'next';
import MoreStories from '../more-stories';
import { FC, useEffect, useState } from 'react';
import { NewsletterPost } from '../services/graphql/types';

const Page: NextPage = () => {
  const [posts, setPosts] = useState<NewsletterPost[]>([]);

  useEffect(() => {
    getAllPosts().then((response: NewsletterPost[]) => setPosts(response));
  }, []);

  return (
    <div className="container mx-auto px-5">
      <MoreStories morePosts={posts} />
    </div>
  );
};

export default Page;
