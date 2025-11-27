import { foodPartnerModel } from '../models/foodPartner.model.js';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';

export const authFoodPartnerMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await foodPartnerModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.foodPartner = user;
    next();
  } catch (error) {
    // using try catch as if token is wrong it will throug error
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

export const authUserMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    // using try catch as if token is wrong it will throug error
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};
