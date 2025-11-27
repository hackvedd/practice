import { foodModel } from '../models/food.model.js';
import { foodPartnerModel } from '../models/foodPartner.model.js';

export const getFoodPartnerById = async (req, res) => {
  try {
    const id = req.params.id;
    const foodPartner = await foodPartnerModel.findById(id);
    if (!foodPartner) {
      return res.status(400).json({ message: 'Food partner not found' });
    }
    const videos = await foodModel.find({ foodPartner: foodPartner._id }).select('video');

    return res.status(200).json({
      message: 'Food partner fetched successfully',
      foodPartner: {
        _id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email,
        phone: foodPartner.phone,
        address: foodPartner.address,
        contactName: foodPartner.contactName,
        videos: videos,
        totalCustomers: 12000,
      },
    });
  } catch (error) {
    res.status(400).json({ message: 'Server error', error: error.message });
  }
};
