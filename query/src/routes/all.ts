import express, { Request, Response } from 'express';
import { searchItems } from '../redis/search';

const router = express.Router();

router.post('/api/query', async (req: Request, res: Response) => {
  const { searchField, query, pageNumber } = req.body;

  const products = await searchItems(searchField, query, parseInt(pageNumber));

  return res.send({ products });
});

export { router as productsQueryRouter };
