import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { verifyToken } from '../utils/token';
import config from '../config';

let io: Server;

export const initSocket = (httpServer: HttpServer): Server => {
  io = new Server(httpServer, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
    transports: ['websocket', 'polling'],
  });

  io.use((socket: Socket, next) => {
    const token =
      socket.handshake.auth?.token || socket.handshake.headers?.token;
    console.log({ token });
    if (!token) return next(new Error('Unauthorized'));
    try {
      const decoded = verifyToken(token, config.jwt_access_secret as string);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (socket as any).user = decoded;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket: Socket) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = (socket as any).user as { _id: string; role: string };
    console.log(`[Socket] Connected: ${user.role} — ${user._id}`);

    socket.on('disconnect', () => {
      console.log('Disconnect from Socket.io');
      console.log(`[Socket] Disconnected: ${user.role} — ${user._id}`);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};
