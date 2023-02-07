import express from 'express'
import { usersList } from '../controllers/user.js'
const userRoutes = express.Router();

userRoutes.get('/users', usersList);

export { userRoutes };