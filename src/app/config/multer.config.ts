// /* eslint-disable @typescript-eslint/no-explicit-any */
// import multer from 'multer';
// import { Request } from 'express';
// import AppError from '../error/AppError';
// import httpStatus from 'http-status';

// const storage = multer.memoryStorage();

// const imageFilter = (
//   _req: Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ): void => {
//   const allowed = ['image/jpeg', 'image/png', 'image/webp'];
//   if (allowed.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(
//       new AppError(
//         httpStatus.BAD_REQUEST,
//         'Only JPG, PNG, and WEBP images are allowed.'
//       ) as any
//     );
//   }
// };

// const documentFilter = (
//   _req: Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ): void => {
//   const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
//   if (allowed.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(
//       new AppError(
//         httpStatus.BAD_REQUEST,
//         'Only JPG, PNG, WEBP, and PDF files are allowed.'
//       ) as any
//     );
//   }
// };

// export const uploadProfilePhoto = multer({
//   storage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// }).single('profilePhoto');

// export const uploadRiderDocuments = multer({
//   storage,
//   fileFilter: documentFilter,
//   limits: { fileSize: 10 * 1024 * 1024, files: 2 },
// }).fields([
//   { name: 'generalDocument', maxCount: 5 },
//   { name: 'enrollmentAgreement', maxCount: 5 },
// ]);

// export const uploadDriverDocuments = multer({
//   storage,
//   fileFilter: documentFilter,
//   limits: { fileSize: 10 * 1024 * 1024, files: 4 },
// }).fields([
//   { name: 'generalDocument', maxCount: 5 },
//   { name: 'generalTraining', maxCount: 5 },
//   { name: 'drivingRecord', maxCount: 5 },
//   { name: 'mndotTraining', maxCount: 5 },
// ]);
