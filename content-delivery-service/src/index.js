require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const contentRoutes = require('./routes/contentRoutes.js');

// Middleware to parse JSON bodies
app.use(express.json());

// Import and use routes
app.use('/api/v1/content', contentRoutes);

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
