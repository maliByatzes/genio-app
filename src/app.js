import express from 'express';
import loadRoutes from './loaders/routes.js';

const app = express();

// temp solution for testing
app.use(express.json({ limit: '10mb' }));
loadRoutes(app);
// app.use(errorMiddleware);

export default app;
