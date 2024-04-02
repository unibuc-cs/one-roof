import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(3000, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${port}`);
});