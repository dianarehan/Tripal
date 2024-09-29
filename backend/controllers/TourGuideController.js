const tourGuideModel=require('../models/TourGuide.js');
const bcrypt = require('bcrypt');

const createTourGuide = async(req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const tourGuide = await tourGuideModel.create({ 
            userName: req.body.userName,  
            email: req.body.email,
            password: hashedPassword
        });
        res.status(200).json(tourGuide);
    }catch (error) {
       res.status(400).json({ error: error.message });
    }
}

module.exports = {createTourGuide};