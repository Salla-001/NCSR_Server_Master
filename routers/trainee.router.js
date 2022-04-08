const trnController = require('../controllers/traineeController')
const express = require('express');

const router = express.Router();

router.post('/saveProfile',trnController.saveTraineeProfile);
router.get('/getAllProfiles',trnController.getTraineeProfile);
router.get('/findDuplicates',trnController.findDuplicateEmail);


module.exports = router;