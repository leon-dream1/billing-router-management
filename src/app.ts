import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFoundHandler from './app/middleware/notFoundHandler';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './app/config';
// import { rootRouter } from './app/router';

const app: Application = express();

// //stripe call/post here
// app.use(
//   '/api/v1/stripe/webhook',
//   express.raw({ type: 'application/json' }),
//   stripeWebhookRouter
// );

//parser
app.set('trust proxy', config.node_env === 'production' ? 1 : 0);
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: [
      process.env.CLIENT_URL || 'http://localhost:3000',
      'http://localhost:5173',
    ],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(compression());

if (config.node_env === 'development') {
  app.use(morgan('dev'));
}

// root api
app.get('/', (req: Request, res: Response) => {
  res.send('server is running..............!');
});

// for testing load balancer and proxy
app.get('/check-ip', (req, res) => {
  res.json({
    ip: req.ip,
    headers: req.headers['x-forwarded-for'],
  });
});

app.use((req: Request, res: Response, next: NextFunction): void => {
  if (req.originalUrl.includes('//')) {
    res.status(400).json({
      success: false,
      message: 'Invalid URL format: Double slashes are not allowed',
    });
    return;
  }
  next();
});

// app.use('/api/v1', rootRouter);

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;

// 1. Billing logic fix
// 2. Manual dispatch
