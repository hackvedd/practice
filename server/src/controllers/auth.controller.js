import { userModel } from '../models/user.model.js';
import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { foodPartnerModel } from '../models/foodPartner.model.js';

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full name, email and password are required' });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcyrpt.hash(password, 10);
    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.cookie('token', token, { httpOnly: true });
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        _id: newUser._id,
        email: newUser.email,
        name: newUser.fullName,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isPasswordCorrect = await bcyrpt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.cookie('token', token, { httpOnly: true });
    return res.status(200).json({
      message: 'Login successful',
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log(error);
  }
};

export const registerFoodParter = async (req, res) => {
  try {
    const { name, email, password, phone, address, contactName } = req.body;
    if (!name || !email || !password || !phone || !address || !contactName) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    const existingUser = await foodPartnerModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcyrpt.hash(password, 10);
    const newUser = await foodPartnerModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      contactName,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.cookie('token', token, { httpOnly: true });
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        _id: newUser._id,
        email: newUser.email,
        name: newUser.fullName,
        phone: newUser.phone,
        address: newUser.address,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginFoodParter = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await foodPartnerModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isPasswordCorrect = await bcyrpt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.cookie('token', token, { httpOnly: true });
    return res.status(200).json({
      message: 'Login successful',
    });
  } catch (error) {
    console.log(error);
  }
};

export const logoutFoodParter = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log(error);
  }
};
