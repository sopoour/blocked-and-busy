import Image from 'next/image';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { styled } from 'styled-components';
import { FC } from 'react';

const StyledMarkdown = styled(Markdown)`
  && {
    li {
      line-height: 2;
    }

    img {
      width: 100%;
    }

    a {
      color: #fe2b2b;
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }
  }
`;

const MarkdownConfig = ({ content }: { content: string }) => {
  return (
    <StyledMarkdown children={content} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} />
  );
};

export default MarkdownConfig;
