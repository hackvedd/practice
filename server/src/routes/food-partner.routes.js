import { Router } from 'express';
import { getFoodPartnerById } from '../controllers/foodPartner.controller.js';

const router = Router();

router.get('/:id', getFoodPartnerById);

export default router;
