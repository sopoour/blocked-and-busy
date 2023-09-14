import { POST_GRAPHQL_FIELDS, fetchGraphQL } from '@app/lib/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getPostBySlug(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  try {
    const data = await fetchGraphQL(
      `query {
          newsletterPostCollection(where: { slug: "${slug}" }, limit: 1) {
            items {
              ${POST_GRAPHQL_FIELDS}
            }
          }
        }`,
    );

    res.status(200).json(data.data.newsletterPostCollection.items?.[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
