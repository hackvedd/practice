import { Router } from 'express';
import {
  login,
  loginFoodParter,
  logout,
  logoutFoodParter,
  register,
  registerFoodParter,
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/food-partner/register', registerFoodParter);

router.post('/food-partner/login', loginFoodParter);

router.post('/food-partner/logout', logoutFoodParter);

export default router;
