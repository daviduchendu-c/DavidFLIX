import mongoose from 'mongoose';
import dns from 'dns';

import {ENV_VAR} from './envVars.js';

// Locally, the system DNS (127.0.0.1) refuses SRV lookups needed by mongodb+srv:// URIs.
// Vercel's resolvers handle them, so leave its DNS alone.
if (!process.env.VERCEL) {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
}

// Serverless functions are reused between requests, so keep one connection
// promise per instance instead of reconnecting every time.
let connection = null;

export const connectDB = async () => {
    if (!connection) {
        connection = mongoose.connect(ENV_VAR.MONGO_URI).then((conn) => {
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return conn;
        }).catch((error) => {
            connection = null; // let the next request retry
            throw error;
        });
    }
    return connection;
};
