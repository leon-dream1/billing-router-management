// import bcrypt from 'bcryptjs';
import { USER_ROLE, USER_STATUS } from '../types/user.types';
import User from '../modules/User/user.model';

export const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: USER_ROLE.ADMIN });

    if (existingAdmin) {
      console.log('ℹAdmin already exists. Skipping seeding...');
      return;
    }

    console.log('No admin found. Creating one...');

    const plainPassword = 'Admin@1234!';
    // const hashedPassword = await bcrypt.hash(plainPassword, 12);

    await User.create({
      email: 'admin@goplaces.com',
      password: plainPassword, // Hashed password pathachhen
      role: USER_ROLE.ADMIN,
      status: USER_STATUS.ACTIVE,
      isFirstLogin: false,
    });

    console.log(' Admin created successfully: admin@goplaces.com');
  } catch (error) {
    console.error(' Error seeding admin:', error);
  }
};
