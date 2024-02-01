import express, { Router } from 'express';
import { get[upName] } from './[subName].controller';

const [subName]Router: Router = express.Router();

[subName]Router.get('/', get[upName]);

export default [subName]Router;
