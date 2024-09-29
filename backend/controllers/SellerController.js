const sellerModel=require('../models/Seller.js');
const bcrypt = require('bcrypt');

const createSeller= async(req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const seller = await sellerModel.create({ 
            userName: req.body.userName,  
            email: req.body.email,
            password: hashedPassword
        });
        res.status(200).json(seller);
    }catch (error) {
       res.status(400).json({ error: error.message });
    }
}

module.exports = {createSeller};