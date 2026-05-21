import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { seedAdmin } from './app/utils/seedAdmin';
import http from 'http';
import { initSocket } from './app/Socket/socket';

let server: Server;

async function startServer() {
  try {
    await mongoose.connect(config.database_url as string, {
      maxPoolSize: 50,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxIdleTimeMS: 30000,
    });

    // server = app.listen(config.port, () => {
    //   console.log(`Example app listening on port ${config.port}`);
    // });

    seedAdmin();

    const httpServer = http.createServer(app);
    initSocket(httpServer);

    server = httpServer.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });

    // const shutdown = async (signal: string) => {
    //   console.log(`\n${signal} received. Shutting down gracefully...`);

    //   httpServer.close(async () => {
    //     console.log('✓ HTTP server closed');

    //     await mongoose.connection.close();
    //     console.log('✓ MongoDB disconnected');

    //     console.log('✓ Graceful shutdown complete');
    //     process.exit(0);
    //   });

    //   setTimeout(() => {
    //     console.error('✗ Forced shutdown');
    //     process.exit(1);
    //   }, 10000);
    // };

    // process.on('SIGTERM', () => shutdown('SIGTERM'));
    // process.on('SIGINT', () => shutdown('SIGINT')); // CTRL+C
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error.message);
  console.error(' Stack:', error.stack);
  process.exit(1);
});

// process.on('uncaughtException', () => {
//   console.log(`uncaughtException is detected , shut done server`);
//   process.exit(1);
// });

process.on(
  'unhandledRejection',
  (reason: unknown, promise: Promise<unknown>) => {
    console.error('Unhandled Rejection at:', promise);
    console.error('Reason:', reason);

    if (server) {
      server.close(() => {
        console.log('Server closed after unhandledRejection');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  }
);
// process.on('unhandledRejection', (): Promise<unknown => {
//   if (server) {
//     server.close(() => {
//       console.log(`unhandledRejection is detected , shut done server`);
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });
