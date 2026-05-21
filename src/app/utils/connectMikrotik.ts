import { RouterOSClient } from 'routeros-client';
import config from '../config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let mikrotikClient: any;
export async function connectMikrotik() {
  try {
    const client = new RouterOSClient({
      host: config.mikrotik.host,
      user: config.mikrotik.user,
      password: config.mikrotik.password,
      port: config.mikrotik.port,
      keepalive: true, // কানেকশন সচল রাখার জন্য
      timeout: 10, // ১০ সেকেন্ড পর টাইমআউট হবে
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mikrotikClient = (await client.connect()) as any;
    console.log('✓ MikroTik API Connected successfully!');
  } catch (error) {
    console.error('✗ MikroTik Connection Failed:', error);
    throw error; // কানেকশন ফেইল হলে সার্ভার স্টার্ট বন্ধ করবে
  }
}
