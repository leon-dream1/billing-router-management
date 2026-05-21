import { mikrotikClient } from './connectMikrotik';

export async function getActiveUsers() {
  try {
    const menu = mikrotikClient.menu('/ip/hotspot/active');
    const users = await menu.print();
    console.log(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
