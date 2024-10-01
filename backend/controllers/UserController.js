const userModel = require('../models/User.js');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const validRoles = ['Seller', 'Advertiser', 'Admin', 'Tour guide', 'Tourist', 'Tourism governor'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role,
      accepted: false,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createUser };
