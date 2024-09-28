const express = require('express');
const router = express.Router();
const {getPrefTags, createPrefTags, updatePrefTags, deletePrefTags} = require ('../controllers/PreferenceTagController');

router.get ('/getPrefTags', getPrefTags);
router.post ('/createPrefTags', createPrefTags);
router.put ('/updatePrefTags/:id', updatePrefTags);
router.delete ('/deletePrefTags/:id', deletePrefTags);
//
module.exports = router;