const express = require('express');
const router = express.Router();
const {createActivity,getActivities,updateActivity,deleteActivity, filterActivities, sortActivities, searchActivities} = require('../controllers/ActivityController');  

router.get('/activities', getActivities); //view all activities (can take username param to get a specific advertiser's activities)   
router.post('/activities', createActivity);    
router.put('/activities/:id', updateActivity);   
router.delete('/activities/:id', deleteActivity); 
router.get('/activities/filter', filterActivities);
router.get('/activities/sort', sortActivities);
router.get('/activities/search', searchActivities);

module.exports = router;