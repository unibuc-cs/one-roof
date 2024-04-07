import express from 'express';
import { connect, seedDatabase } from './database';
import { config } from './configure';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

export const app = express();
const port = config.port;

app.use((req, res, next) => {
    const now = new Date().toISOString();
    console.log(`${now} - ${req.method} ${req.path} - IP: ${req.ip}`);
    next();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/secret', ClerkExpressWithAuth(), (req, res) => {
    res.send('Secret data');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${port}`);
});

connect().then(() => {
    console.log('Database connected');
    seedDatabase().then(() => {
        console.log('Database seeded');
    }).catch((error) => {
        console.error('Database seeding failed');
    });
});
