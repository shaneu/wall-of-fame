const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.post('/', userController.validateRegister, catchErrors(userController.register), authController.login);

module.exports = router;
