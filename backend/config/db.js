import mongoose from 'mongoose';
import dns from 'dns';

import {ENV_VAR} from './envVars.js';

// The system DNS (127.0.0.1) refuses SRV lookups needed by mongodb+srv:// URIs
dns.setServers(['8.8.8.8', '1.1.1.1']);




export const connectDB = async () => {
    try {
     const conn = await mongoose.connect(ENV_VAR.MONGO_URI) 
     console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    } }