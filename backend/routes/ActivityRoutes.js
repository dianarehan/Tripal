const express = require('express');
const router = express.Router();
const {createActivity,getActivities,updateActivity,deleteActivity, filterActivities} = require('../controllers/ActivityController');  

router.get('/activities/:username', getActivities);        
router.post('/activities', createActivity);    
router.put('/activities/:id', updateActivity);   
router.delete('/activities/:id', deleteActivity); 
router.get('/activities', filterActivities);

module.exports = router;