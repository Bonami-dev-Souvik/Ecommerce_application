import express from 'express';
import { signUpController } from '../controllers/signUpController';

const signUpRouter = express.Router();

signUpRouter.post('/signUp', signUpController); 

export default signUpRouter;
