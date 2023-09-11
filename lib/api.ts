
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
`

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
    }
  ).then((response) => response.json())
}


function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.newsletterPostCollection?.items?.[0]
}

function extractPostEntries(fetchResponse: any): any[] {
  return fetchResponse.data?.newsletterPostCollection.items
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      newsletterPostCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,

  )
  return extractPost(entry)
}

export async function getAllPosts(): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      newsletterPostCollection(where: { slug_exists: true }, order: date_DESC, limit: 10) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
  )
  return extractPostEntries(entries)
}

export async function getPostAndMorePosts(
  slug: string,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      newsletterPostCollection(where: { slug: "${slug}" }, , limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
 
  )
  const entries = await fetchGraphQL(
    `query {
      newsletterPostCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,

  )
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  }
}
