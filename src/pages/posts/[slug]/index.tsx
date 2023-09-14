import MarkdownConfig from '@app/src/components/MarkdownConfig/MarkdownConfig';
import { NextPage } from 'next';
import { NewsletterPost } from '@app/src/services/graphql/types';
import Sidebar from '@app/src/components/Sidebar/Sidebar';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '@app/src/hooks/fetch/useFetch';

const DetailContainer = styled.div`
  padding: 0 20px;
`;

const PostPage: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useSWR<NewsletterPost | null>(`/api/posts/${slug}`, fetcher);
  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <Sidebar
      side="left"
      open={open}
      onClose={() => setOpen(false)}
      backgroundColor={data?.backgroundColour.value}
    >
      <DetailContainer>
        <MarkdownConfig content={data?.mainContent as string} />
      </DetailContainer>
    </Sidebar>
  );
};

export default PostPage;
