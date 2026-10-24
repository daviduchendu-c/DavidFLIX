import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from './routes/tv.route.js';
import searchRoutes from './routes/search.route.js';

import {ENV_VAR} from './config/envVars.js';
import {connectDB} from './config/db.js';
import {protectRoute} from './middleware/protectRoute.js';


const app = express();
const PORT = ENV_VAR.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// Make sure the database is connected before any API route runs
// (on Vercel each cold start begins without a connection).
app.use('/api', async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        res.status(503).json({ success: false, message: 'Database unavailable, try again shortly' });
    }
});

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectRoute,movieRoutes);
app.use("/api/v1/tv",protectRoute,tvRoutes);
app.use("/api/v1/search",protectRoute,searchRoutes);

// On Vercel the built frontend is served by the CDN; this branch is for `npm start`.
if (ENV_VAR.NODE_ENV === 'production' && !process.env.VERCEL) {
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

    // Express 5 needs a named wildcard; hand every non-API route to the SPA.
    app.get('/{*splat}', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        connectDB().catch((error) => {
            console.error(`Error connecting to MongoDB: ${error.message}`);
            process.exit(1);
        });
    });
}

export default app;
