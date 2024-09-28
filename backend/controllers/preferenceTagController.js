const preferenceTag = require ('../models/PreferenceTag.js');
const { default: mongoose } = require('mongoose');
//
const createPrefTags =  async (req, res) => {
    const {Name} = req.body;
    try {
        const createdPrefTag = await preferenceTag.create ({Name});

        if (!Name){
            res.status (406).json ('Name is required');
        }
        res.status (200).json ({status: 'success', data: {createdPrefTag}});
    }
    catch (error){
        res.status (400).json ({error:error.message});
    }
}

const getPrefTags = async (req, res) => {
    try{
        const tags = await preferenceTag.find();

        if (tags.length === 0) {
            return res.status(404).json('No tags found');
        }

        res.status (200).json (tags);
    }
    catch (error){
        res.status (400).json ('Error fetching all tags', error);
    }
}

const updatePrefTags = async (req, res) => {
    try{
        const {id} = req.params;
        const {Name} = req.body;

        const updatedPrefTag = await preferenceTag.findByIdAndUpdate(
            id,
            {Name},
            {new:true});

        if (!updatedPrefTag){
            return res.status (404).json ('Tag does not exist');
        }

        return res.status (200).json ({status: 'success', data: {updatedPrefTag}})
    }
    catch (error){
        res.status (400).json ({error: error.message});
    }
}


const deletePrefTags = async (req, res) => {
    const {id} = req.params;
    try{
        const deletedPrefTag = await preferenceTag.findByIdAndDelete(id);

        if (!deletedPrefTag){
            return res.status (404).json ('Tag does not exist');
        }

        return res.status (200).json ('Tag deleted successfully')
    }
    catch (error){
        res.status (400).json ('Error deleting tag', error);
    }
}

module.exports = {createPrefTags, getPrefTags, updatePrefTags, deletePrefTags};