import express, { Application } from 'express';

const app: Application = express();

// database connection

import { sequelize } from './database/db';


export default app;