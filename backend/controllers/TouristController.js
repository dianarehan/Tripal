const touristModel = require('../models/Tourist');
const bcrypt = require('bcrypt');

const createTourist = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const tourist = await touristModel.create({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            mobileNumber: req.body.mobileNumber,
            nationality: req.body.nationality,
            dateOfBirth: req.body.dateOfBirth,
            job: req.body.job
        });
        res.status(200).json(tourist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { createTourist };