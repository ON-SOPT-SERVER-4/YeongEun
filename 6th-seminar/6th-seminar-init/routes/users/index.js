const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const authUtils = require('../../middlewares/authUtils');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/', userController.readAll);
router.get('/profile', authUtils.checkToken, userController.getProfile);
router.get('/:id', userController.readOne);

module.exports = router;
