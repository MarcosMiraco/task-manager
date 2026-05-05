import "dotenv/config";
import express from 'express';
import { registerRoutes } from "@routes/index.js";
import { errorHandler } from '@shared/utils/error.handler.js';
import { responseHandler } from '@shared/utils/response.handler.js';


export const app = express();

app.use(express.json());
await registerRoutes(app, "/api");

app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use(responseHandler);
app.use(errorHandler);
