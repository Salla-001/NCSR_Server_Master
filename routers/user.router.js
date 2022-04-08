const usrController = require('../controllers/userController')
const express = require('express');

const router = express.Router();

router.post('/register',usrController.register);
router.post('/saveProfile',usrController.saveProfile);
router.post('/saveRole',usrController.saveRole);
router.get('/getRoles',usrController.getRoles);


// router.get('/getAllProfiles',trnController.getTraineeProfile);
// router.get('/findDuplicates',trnController.findDuplicateEmail);


module.exports = router;