// import { ClientSession } from 'mongoose';
// import { Counter } from '../modules/Counter/counter.model';

// export const getNextId = async (
//   idName: 'driverId' | 'riderId',
//   prefix: string,
//   session: ClientSession
// ): Promise<string> => {
//   const counter = await Counter.findOneAndUpdate(
//     { id: idName },
//     { $inc: { seq: 1 } },
//     {
//       new: true,
//       upsert: true,
//       session,
//     }
//   );

//   return `${prefix}${counter.seq.toString().padStart(3, '0')}`;
// };
