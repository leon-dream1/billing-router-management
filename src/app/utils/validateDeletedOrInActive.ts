// import AppError from '../error/AppError';
// import { IUser } from '../modules/User/user.interface';

// export const validateDeletedOrInActive = (user: IUser) => {
//   if (!user || user.isDeleted) {
//     throw new AppError(401, 'User not found');
//   }

//   if (user.status === 'inactive') {
//     throw new AppError(
//       403,
//       'Your account is inactive. Please contact support.'
//     );
//   }

//   return user;
// };
