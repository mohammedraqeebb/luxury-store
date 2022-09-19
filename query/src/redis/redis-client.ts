import { createClient } from 'redis';
import 'dotenv/config';

const client = createClient({
  socket: {
    host: 'redis-17794.c305.ap-south-1-1.ec2.cloud.redislabs.com',
    port: 17794,
  },
  password: 'LsqEDl9A3gYdLTG1ywftRBjYwvwXS5Lo',
});

export { client };
export type Client = typeof client;
