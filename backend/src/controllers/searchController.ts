import { Request, Response } from 'express';
import { getSearchResults } from '../services/searchService';

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const results = await getSearchResults(query);
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
