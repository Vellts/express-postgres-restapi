import express, { Application } from 'express';
import "dotenv/config"
import morgan from 'morgan';
import user_route from './routes/user.route';
import post_route from './routes/post.route';

const app: Application = express();

// database connection

import { sequelize_validate } from './database/db';
sequelize_validate();

// middlewares

app.use(morgan('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// routes

// console.log(router)
app.use(user_route);
app.use(post_route);

export default app;