const tourGuideModel = require('../models/users/TourGuide.js');
const bcrypt = require('bcrypt');
const userModel = require('../models/users/User.js')

const createTourGuide = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !password || !email) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const existingName = await tourGuideModel.findOne({ userName });
        if (existingName) {
            return res.status(409).json({ error: "Username already exists" });
        }

        const existingEmail = await tourGuideModel.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ error: "Email already exists" });
        }

        const tourGuide = await tourGuideModel.create({
            userName: userName,
            email: email,
            password: hashedPassword
        });
        const id = tourGuide._id
        // await userModel.create({
        //     userID: id,
        //     role: "TourGuide"
        // })
        res.status(201).json(tourGuide);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const getTourguideInfo = async (req, res) => {
    try {
        const tourGuide = await tourGuideModel.findById(req.params.id)

        if (!tourGuide) {
            return res.status(404).json({ error: 'Tour Guide not found' });
        }

        res.status(200).json(tourGuide);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }


}
const updateTourguideData = async (req, res) => {
    try {
        const { id } = req.params;



        const updatedTourGuide = await tourGuideModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true });

        if (!updatedTourGuide) {
            return res.status(404).json('Tour Guide not found');
        }

        return res.status(200).json({ updatedTourGuide })
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = { createTourGuide, updateTourguideData, getTourguideInfo };