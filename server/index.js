require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, welcome to the Nova API!');
});

app.use('/api/auth', authRouter);

mongoose.connect('mongodb+srv://nova:nova@cluster0.haxquto.mongodb.net/')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Failed to connect to MongoDB:', error));


app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Nova Running on port ${PORT}`);
});
