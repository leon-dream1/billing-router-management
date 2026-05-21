import dotenv from 'dotenv';
import { SignOptions } from 'jsonwebtoken';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

console.log(process.env.DATABASE_URL, process.env.NODE_ENV);
export default {
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_reset_secret: process.env.JWT_RESET_SECRET,
  jwt_access_expires_in: process.env
    .JWT_ACCESS_EXPIRES as SignOptions['expiresIn'],
  jwt_refresh_expires_in: process.env
    .JWT_REFRESH_EXPIRES as SignOptions['expiresIn'],
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  stripe_api_version: process.env.STRIPE_API_VERSION,

  firebase_project_id: process.env.FIREBASE_PROJECT_ID,
  firebase_client_email: process.env.FIREBASE_CLIENT_EMAIL,
  firebase_private_key: process.env.FIREBASE_PRIVATE_KEY,
};
