const Seller = require('../models/users/Seller.js');
const bcrypt = require('bcrypt');
const userModel = require('../models/users/User.js')
const createSeller = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !password || !email) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const existingName = await Seller.findOne({ userName });
        if (existingName) {
            return res.status(409).json({ error: "Username already exists" });
        }

        const existingEmail = await Seller.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ error: "Email already exists" });
        }

        const sellernew = await Seller.create({
            userName: userName,
            email: email,
            password: hashedPassword
        });
        // const id = sellernew._id
        // await userModel.create({
        //     userID: id,
        //     role: "Seller"
        // })
        res.status(201).json(sellernew);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const readSellerData = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id)

        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
        }

        res.status(200).json({ status: 'success', data: seller });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }


}

const updateSellerData = async (req, res) => {  // SAME CODE AS CREATE PROFILE???
    const { name, description } = req.body;
    try {
        const updatedSeller = await Seller.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }     // Options: return updated document, run validation
        );

        if (!updatedSeller) {
            return res.status(404).json({ error: 'Seller not found yayyy' });
        }

        res.status(200).json({ status: 'success', data: updatedSeller });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = { createSeller, readSellerData, updateSellerData };