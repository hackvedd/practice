import { foodModel } from '../models/food.model.js';
import { likeModel } from '../models/likes.models.js';
import { saveModel } from '../models/save.model.js';
import { uploadFile } from '../services/storage.services.js';
import { v4 as uuidv4 } from 'uuid';

export const createFood = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (req.file === undefined) {
      return res.status(400).json({ message: 'Video is required' });
    }

    const fileUploadResult = await uploadFile(req.file.buffer, uuidv4());

    const foodItem = await foodModel.create({
      name,
      description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    return res.status(201).json({
      message: 'food created successfully',
      foodItem,
    });
  } catch (error) {
    return res.status(400).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const getFoodItem = async (req, res) => {
  try {
    const foodItem = await foodModel.find();
    return res.status(200).json({
      message: 'food fetched successfully',
      foodItem,
    });
  } catch (error) {
    return res.status(400).json({ message: 'Server error', error: error.message });
  }
};

export const likeFoodItem = async (req, res) => {
  try {
    const { foodId } = req.body;
    const user = req.user;
    if (!foodId) {
      return res.status(400).json({ message: 'foodId is required' });
    }

    const isAlreadyLiked = await likeModel.findOne({ user: user._id, food: foodId });
    if (isAlreadyLiked) {
      await likeModel.deleteOne({ user: user._id, food: foodId });
      await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
      return res.status(200).json({
        message: 'like deleted successfully',
      });
    }

    const like = await likeModel.create({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });
    return res.status(201).json({
      message: 'like created successfully',
      like,
    });
  } catch (error) {
    res.status(400).json({ message: 'Server error' });
    console.log('error', error);
  }
};

export const saveFoodItem = async (req, res) => {
  try {
    const { foodId } = req.body;
    const user = req.user;
    if (!foodId) {
      return res.status(400).json({ message: 'foodId is required' });
    }

    const isAlreadySaved = await saveModel.findOne({ user: user._id, food: foodId });
    if (isAlreadySaved) {
      await saveModel.deleteOne({ user: user._id, food: foodId });
      await foodModel.findByIdAndUpdate(foodId, { $inc: { saveCount: -1 } });
      return res.status(200).json({
        message: 'save deleted successfully',
      });
    }

    const save = await saveModel.create({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, { $inc: { saveCount: 1 } });
    return res.status(201).json({
      message: 'save created successfully',
      save,
    });
  } catch (error) {
    res.status(400).json({ message: 'Server error' });
    console.log('error', error);
  }
};

export const getSavedFood = async (req, res) => {
  try {
    const user = req.user;
    const savedFood = await saveModel.find({ user: user._id }).select('food');
    return res.status(200).json({
      message: 'saved food fetched successfully',
      savedFood,
    });
  } catch (error) {
    res.status(400).json({ message: 'Server error', error: error.message });
  }
};
