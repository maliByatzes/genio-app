import express from 'express';
import loadRoutes from './loaders/routes.js';

const app = express();

app.use(express.json());
loadRoutes(app);

export default app;
