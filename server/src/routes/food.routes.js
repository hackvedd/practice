import { Router } from 'express';
import {
  createFood,
  getFoodItem,
  getSavedFood,
  likeFoodItem,
  saveFoodItem,
} from '../controllers/food.controller.js';
import { authFoodPartnerMiddleware, authUserMiddleware } from '../middleware/auth.middleware.js';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = Router();

router.post('/', authFoodPartnerMiddleware, upload.single('video'), createFood);

router.get('/', authUserMiddleware, getFoodItem);

router.post('/like', authUserMiddleware, likeFoodItem);

router.post('/save', authUserMiddleware, saveFoodItem);
router.get('/saved', authUserMiddleware, getSavedFood);

export default router;
