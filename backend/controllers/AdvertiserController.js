const advertiserModel = require('../models/users/Advertiser.js');
const bcrypt = require('bcrypt');
const userModel = require('../models/users/User.js')

const createAdvertiser = async (req, res) => {
    try {
        const { userName, email, password, website, hotline, companyProfile } = req.body;
        // if (!userName || !password || !email) {
        //     return res.status(400).json({ error: "Missing required fields" });
        //   }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const existingName = await advertiserModel.findOne({ userName });
        if (existingName) {
            return res.status(409).json({ error: "Username already exists" });
        }

        const existingEmail = await advertiserModel.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ error: "Email already exists" });
        }

        const advertiser = await advertiserModel.create({
            userName: userName,
            email: email,
            password: hashedPassword,
            website,
            hotline,
            companyProfile
        });
        const id = advertiser._id
        // await userModel.create({
        //     userID: id,
        //     role: "Advertiser"
        // })
        res.status(201).json(advertiser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const readAdvertiser = async (req, res) => {
    try {
        const advertiser = await advertiserModel.findById(req.params.id);
        if (!advertiser) {
            return res.status(404).json({ error: "Advertiser not found" });
        }
        res.status(200).json(advertiser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const updateAdvertiser = async (req, res) => {
    try {
        const { userName, email, password, website, hotline, companyProfile } = req.body;
        const existingAdvertiser = await advertiserModel.findById(req.params.id);
        if (!existingAdvertiser) {
            return res.status(404).json({ error: "Advertiser not found" });
        }
        let hashedPassword = existingAdvertiser.password; // Keep the current password if not updated
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        const updateData = {
            userName,
            email,
            password: hashedPassword,
            website,
            hotline
        };
        if (companyProfile) {
            // Merge the existing companyProfile with the new fields
            updateData['companyProfile'] = {
                ...existingAdvertiser.companyProfile.toObject(), // Preserve existing fields
                ...companyProfile // Overwrite with new data
            };
        }

        const updatedAdvertiser = await advertiserModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateData }, // Use $set to update only the provided fields
            { new: true, runValidators: true }
        );

        if (!updatedAdvertiser) {
            return res.status(404).json({ error: "Advertiser not found" });
        }

        res.status(200).json(updatedAdvertiser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




module.exports = { createAdvertiser, readAdvertiser, updateAdvertiser };