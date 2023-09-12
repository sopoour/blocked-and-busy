import Link from 'next/link';
import DateComponent from './date';
import CoverImage from './components/CoverImage';
import { NewsletterPost } from './services/graphql/types';

function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: any;
  date: string;
  excerpt: string;
  author: any;
  slug: string;
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateComponent dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  );
}

export default function MoreStories({ morePosts }: { morePosts: NewsletterPost[] }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {morePosts?.map((post) => (
          <PostPreview
            key={post.slug}
            title={post?.title || ''}
            coverImage={post.picture}
            date={post.date}
            author={post.author}
            slug={post.slug || ''}
            excerpt={post.previewText || ''}
          />
        ))}
      </div>
    </section>
  );
}
