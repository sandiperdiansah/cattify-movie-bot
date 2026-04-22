import { config } from 'dotenv';

config({
    path: ['.env.production', '.env.staging', '.env.development', '.env'],
});
