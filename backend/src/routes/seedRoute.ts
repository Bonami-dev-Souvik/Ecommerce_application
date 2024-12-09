import express from 'express';
import { main } from '../seed/seed';

const seedRouter = express.Router();

seedRouter.get('/seed-data', main);

export default seedRouter;