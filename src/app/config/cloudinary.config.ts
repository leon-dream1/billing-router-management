// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { v2 as cloudinary } from 'cloudinary';
// import config from '.';
// import path from 'path';

// cloudinary.config({
//   cloud_name: config.cloudinary_cloud_name,
//   api_key: config.cloudinary_api_key,
//   api_secret: config.cloudinary_api_secret,
// });

// type UploadResult = { url: string; public_id: string };

// export const uploadToCloudinary = (
//   fileBuffer: Buffer,
//   folder: string,
//   file: Express.Multer.File
// ): Promise<UploadResult> => {
//   return new Promise((resolve, reject) => {
//     const isImage = file.mimetype.startsWith('image/');
//     const isPDF = file.mimetype === 'application/pdf';

//     const fileNameWithoutExt = path
//       .parse(file.originalname)
//       .name.replace(/\s+/g, '-');

//     const customPublicId = `${fileNameWithoutExt}-${Date.now()}`;

//     const uploadOptions: Record<string, any> = {
//       folder,
//       public_id: customPublicId,
//       resource_type: 'image',
//       access_mode: 'public',
//     };

//     if (isImage) {
//       uploadOptions.transformation = [
//         { width: 1200, crop: 'limit' },
//         { quality: 'auto' },
//         { fetch_format: 'auto' },
//       ];
//     }

//     if (isPDF) {
//       uploadOptions.pages = true;
//     }

//     const uploadStream = cloudinary.uploader.upload_stream(
//       uploadOptions,
//       (error, result) => {
//         if (error) return reject(error);
//         resolve({ url: result!.secure_url, public_id: result!.public_id });
//       }
//     );

//     uploadStream.end(fileBuffer);
//   });
// };

// export const uploadProfilePhotoToCloudinary = (
//   fileBuffer: Buffer,
//   folder: string,
//   file: Express.Multer.File
// ): Promise<UploadResult> => {
//   return new Promise((resolve, reject) => {
//     const fileNameWithoutExt = path
//       .parse(file.originalname)
//       .name.replace(/\s+/g, '-');

//     const customPublicId = `${fileNameWithoutExt}-${Date.now()}`;

//     const uploadOptions: Record<string, any> = {
//       folder,
//       public_id: customPublicId,
//       resource_type: 'image',
//       access_mode: 'public',
//       transformation: [
//         { width: 400, height: 400, crop: 'fill', gravity: 'face' },
//         { quality: 'auto' },
//         { fetch_format: 'auto' },
//       ],
//     };

//     const uploadStream = cloudinary.uploader.upload_stream(
//       uploadOptions,
//       (error, result) => {
//         if (error) return reject(error);
//         resolve({ url: result!.secure_url, public_id: result!.public_id });
//       }
//     );

//     uploadStream.end(fileBuffer);
//   });
// };

// export const deleteFromCloudinary = async (
//   publicId: string,
//   resourceType: 'image' | 'raw' | 'video' = 'image'
// ): Promise<void> => {
//   try {
//     await cloudinary.uploader.destroy(publicId, {
//       resource_type: resourceType,
//     });
//   } catch {
//     throw new Error('Failed to delete file from Cloudinary');
//   }
// };

// export const deleteMultipleFromCloudinary = async (
//   publicIds: string[],
//   resourceType: 'image' | 'raw' | 'video' = 'image'
// ): Promise<void> => {
//   if (!publicIds?.length) return;
//   try {
//     await cloudinary.api.delete_resources(publicIds, {
//       resource_type: resourceType,
//     });
//   } catch {
//     throw new Error('Failed to delete files from Cloudinary');
//   }
// };

// export default cloudinary;
