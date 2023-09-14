import { POST_GRAPHQL_FIELDS, fetchGraphQL } from '@app/lib/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchGraphQL(
      `query {
            newsletterPostCollection(where: { slug_exists: true }, order: date_ASC, limit: 1000) {
              items {
                ${POST_GRAPHQL_FIELDS}
              }
            }
          }`,
    );

    res.status(200).json(data.data.newsletterPostCollection.items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
