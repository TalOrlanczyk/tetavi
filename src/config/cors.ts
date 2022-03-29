const locals = [
    'http://localhost:3001',
    '127.0.0.1:3001',
    'http://localhost:3000',
    '127.0.0.1:3002',
    'http://localhost:3002',
];

export default {
    origin: [...locals],
    credentials: true,
    methods: ['GET', 'POST'],
};
