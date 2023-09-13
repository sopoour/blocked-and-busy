import { styled } from 'styled-components';
import ContentfulImage from '../../../lib/contentful-image';
import Link from 'next/link';
import { FC } from 'react';
import { Maybe } from 'graphql/jsutils/Maybe';

const Image = styled(ContentfulImage)`
  border-radius: 10px;
  border: 1px solid #fff;
`;

type Props = {
  title: string;
  url?: Maybe<string>;
  slug?: string;
};

const CoverImage: FC<Props> = ({ title, url, slug }) => {
  const image = url && (
    <Image alt={`Cover Image for ${title}`} priority src={url} objectFit="cover" fill />
  );

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
