const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const { User, Post, Like } = require('../../models');
const userController = require('../../controller/userController');

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

router.get('/', userController.readAll);

router.get('/:id', userController.readOne);


module.exports = router;
