import Fastify from 'fastify';
import cors from '@fastify/cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });

// API Configuration
const WALLHAVEN_API_KEY = 'JdkcuzI0lq1xlLm1zq5FFAcqrfW2yQwT';
const WALLHAVEN_BASE_URL = 'https://wallhaven.cc/api/v1';

// Register CORS
await fastify.register(cors, {
    origin: true
});

// Data persistence (simple JSON for local click stats)
const DATA_FILE = path.join(__dirname, 'data.json');
let photoStats = {};

if (fs.existsSync(DATA_FILE)) {
    try {
        photoStats = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    } catch (e) {
        photoStats = {};
    }
}

const saveStats = () => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(photoStats, null, 2));
};

// Fetch from Wallhaven
const fetchWallhaven = async (endpoint, params = {}) => {
    const url = new URL(`${WALLHAVEN_BASE_URL}/${endpoint}`);
    url.searchParams.append('apikey', WALLHAVEN_API_KEY);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const res = await fetch(url.toString());
    const data = await res.json();
    return data.data || [];
};

// Routes
fastify.get('/api/photos', async (request, reply) => {
    const { sorting = 'date_added', categories = '111', purity = '100', q = '' } = request.query;
    
    // Map our categories to wallhaven categories if needed
    const wallhavenData = await fetchWallhaven('search', { 
        sorting,
        q,
        categories, 
        purity     
    });

    // Merge with local click stats
    return wallhavenData.map(p => ({
        id: p.id,
        file: p.path,
        thumb: p.thumbs.large,
        title: p.tags ? p.tags[0]?.title : '壁纸 #' + p.id,
        views: (photoStats[p.id] || 0) + (p.views || 0) // Mix local clicks with remote views
    }));
});

fastify.post('/api/photos/:id/click', async (request, reply) => {
    const { id } = request.params;
    photoStats[id] = (photoStats[id] || 0) + 1;
    saveStats();
    return { id, views: photoStats[id] };
});

// Start server
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Backend server with Wallhaven integration running at http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
