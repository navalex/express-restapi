import express, { Router } from 'express';
import { getExample } from './example.controller';

const exampleRouter: Router = express.Router();

exampleRouter.get('/', getExample);

export default exampleRouter;
