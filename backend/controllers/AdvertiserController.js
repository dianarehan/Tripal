const advertiserModel = require('../models/Advertiser.js');
const bcrypt = require('bcrypt');
const userModel = require('../models/User.js')

const createAdvertiser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const advertiser = await advertiserModel.create({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword
        });
        const id = advertiser._id
        await userModel.create({
            userID: id,
            role: "Advertiser"
        })
        res.status(200).json(advertiser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = { createAdvertiser };