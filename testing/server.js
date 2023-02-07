import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//routes
// const userRoutes = require('./routes/user');
import { userRoutes } from './routes/user.js'
import authRoutes from './routes/auth.js';

const app = express();
const PORT = 8090;

//db
try {
    console.log("DBURL", process.env.DATABASE);
    // mongoose.connect(process.env.DATABASE);

    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DB Connected.");
    })
} catch (e) {
    console.log("e", e)
}
app.use(bodyParser.json());

// routes using
app.use('/api', userRoutes);
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log('app is listening', PORT)
})