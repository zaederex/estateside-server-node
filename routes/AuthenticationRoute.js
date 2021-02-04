const express = require('express');
const authController = require('../controllers/users/AuthenticationController');

const router = express.Router();

router.post('/google/:role', authController.login);

module.exports = router;
