import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { Asset, Maybe, NewsletterPostMainContent } from '@app/src/services/graphql/types';

const RichTextAsset = ({ id, assets }: { id: string; assets: Maybe<Asset>[] }) => {
  const asset = assets?.find((asset) => asset?.sys.id === id);

  if (asset?.url) {
    return <Image src={asset.url} layout="fill" alt={asset.description ?? ''} />;
  }

  return null;
};

export function Markdown({ content }: { content: NewsletterPostMainContent }) {
  return documentToReactComponents(content?.json, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
        <RichTextAsset id={node.data.target.sys.id} assets={content?.links?.assets?.block ?? []} />
      ),
      /* [INLINES.HYPERLINK]: (node: any) => (node
      )  */
    },
  });
}
