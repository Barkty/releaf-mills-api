import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Router, ROUTE_BASE } from '../routes';
import compression from 'compression';
import { GlobalErrorCatcherMiddleware } from '../shared/middlewares/global-error-catcher.midleware';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

const corsOptions = {
  exposedHeaders: [ 'hash-id-key' ]
};
app.use(cors(corsOptions));

app.use(express.static('public'));

// Use helmet to secure Express headers
app.use(helmet());

app.disable('x-powered-by');

app.get('/health', (_req, res) => {res.json({ message: 'Okay' })});

app.use(ROUTE_BASE.V1_PATH, Router);

// Catch-all for 404 errors
app.use((_req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Resource Not Found'
  });
});

app.use(GlobalErrorCatcherMiddleware); // must be last applied middleware to catch globalErrs

export default app;

