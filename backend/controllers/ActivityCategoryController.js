const activityCategory = require('../models/ActivityCategory')
const { default: mongoose } = require('mongoose');


const createActivityCategory = async (req, res) => {
    try {
        const activityCategoryCreated = await activityCategory.create({
            Name: req.body.Name
        })
        res.status(200).json(activityCategoryCreated)
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }

}
const getActivityCategories = async (req, res) => {
    try {
        const existingActivityCategories = await activityCategory.find({})
        res.status(200).json(existingActivityCategories)
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }

}


module.exports = {
    createActivityCategory,
    getActivityCategories

}