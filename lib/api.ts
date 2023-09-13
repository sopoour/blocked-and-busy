import { GeneralContent, NewsletterPost } from '@app/src/services/graphql/types';

const POST_GRAPHQL_FIELDS = `
  slug
  title
  picture {
    url
  }
  date
  previewText
  backgroundColour
  mainContent {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

async function fetchGraphQL(query: string): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    },
  ).then((response) => response.json());
}

function extractPost(fetchResponse: any): NewsletterPost {
  return fetchResponse?.data?.newsletterPostCollection?.items?.[0];
}

function extractPostEntries(fetchResponse: any): NewsletterPost[] {
  return fetchResponse.data?.newsletterPostCollection.items;
}

export const getPreviewPostBySlug = async (slug: string | null): Promise<NewsletterPost> => {
  const entry = await fetchGraphQL(
    `query {
      newsletterPostCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
  );
  return extractPost(entry);
};

export const getAllPosts = async (): Promise<NewsletterPost[]> => {
  const entries = await fetchGraphQL(
    `query {
      newsletterPostCollection(where: { slug_exists: true }, order: date_DESC, limit: 10) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
  );
  return extractPostEntries(entries);
};

export const getPostAndMorePosts = async (
  slug: string,
): Promise<{ post: NewsletterPost; morePosts: NewsletterPost[] }> => {
  const entry = await fetchGraphQL(
    `query {
      newsletterPostCollection(where: { slug: "${slug}" }, , limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
  );
  const entries = await fetchGraphQL(
    `query {
      newsletterPostCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
};

export const getGeneralContent = async (): Promise<GeneralContent> => {
  const entries = await fetchGraphQL(
    `query {
      generalContent(id: "1C7fR23aEiuYiiUQR5ABBp") {
          pageDescription
          about {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  description
                }
              }
            }
          }
      }
    }`,
  );

  return entries?.data?.generalContent;
};
