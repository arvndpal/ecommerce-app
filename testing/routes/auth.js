import express from 'express';
import { signup } from '../controllers/auth.js';
import { signupValidator } from '../validators/signupValidator.js';
const router = express.Router();

router.post('/signup', signupValidator, signup);

export default router;
