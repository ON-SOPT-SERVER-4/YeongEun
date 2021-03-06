const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const { User } = require('../../models');
const { stat } = require('fs');
const userController = require('../../controller/userController');

//시퀄라이즈 쿼리는 실습이 끝나고 배워봐요! 지금은 따라서 해봅시다!
router.post('/signup', userController.signup);

router.post('/signin', async (req, res) => {
    const { email, password } = req.body; // 1. req.body에서 데이터 가져오기

    //2. request data 확인하기, email, password, userName data가 없다면 NullValue 반환
    if (!email || !password){
        console.log('필요한 값이 없습니다!');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    try {
        //3. 존재하는 아이디인지 확인하기. 존재하지 않는 아이디면 NO USER 반환
        const alreadyEmail = await User.findOne({
            where: {
                email : email,
            },
        });
        console.log(alreadyEmail);

        if (!alreadyEmail){
            console.log('없는 이메일 입니다.');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
        }
        //4. 비밀번호 확인하기 - 로그인할 email의 salt를 DB에서 가져와서 사용자가 request로 보낸 password와 암호화를 한후 디비에 저장되어있는 password와 일치하면 true
        // 일치하지 않으면 Miss Match password 반환
        const {id, userName, salt, password : hashedPassword } = alreadyEmail;
        const inputPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

        if (inputPassword !== hashedPassword) {
            console.log('비밀번호가 일치하지 않습니다.');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.OK, responseMessage.MISS_MATCH_PW));
        }
        //5. status: 200 ,message: SIGN_IN_SUCCESS, data: id, email, userName 반환
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, {id, email, userName}));
    } catch (error){
        console.error(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
    }
})

router.get('/', async (req, res) => {
    // status: 200, message: READ_USER_ALL_SUCCESS, data: id, email, userName 반환
    try{
        const users = await User.findAll({
            attributes: ['id', 'email', 'userName'],
        });
        console.log(users);
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_ALL_SUCCESS, users));
    } catch (error) {
        console.error(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_USER_ALL_FAIL));
    }
})
router.get('/:id', async (req, res) => {
    //1. parameter로 id값을 받아온다! (id값은 인덱스값)
    const {id} = req.params;
    //2. id값이 유효한지 체크! 존재하지 않는 아이디면 NO_USER 반환
    try{
        const user = await User.findOne({
            where: {
                id : id,
            },
            attributes: ['id', 'email', 'userName'],
        });
        if (!user) {
            console.log('존재하지 않는 아이디 입니다.');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
        }

        //3. status:200 message: READ_USER_SUCCESS, id, email, userName 반환
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_ALL_SUCCESS, user));
    } catch (error){
        console.error (error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_USER_ALL_FAIL));
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findOne({
            where : {
                id : id,
            },
        });
        if (!user) {
            console.log('존재하지 않는 아이디 입니다.');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
        }
        const delUser = await User.destroy({
            where :{
                id : id,
            },
            attributes: ['id', 'email', 'userName'],
        });
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_USER_SUCCESS));
    } catch (error){
        console.error (error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_USER_FAIL));
    }
});

/////put
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {email, userName, password} = req.body;

    try{
        const user = await User.findOne({
            where : {
                id : id,
            },
            attributes: ['id', 'email', 'userName', 'password'],
        });

        if (!user) {
            console.log('존재하지 않는 아이디 입니다.');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
        }

        const salt = crypto.randomBytes(64).toString('base64');
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

        const putUser = await User.update({
            email,
            password : hashedPassword,
            userName,
            salt,
        },
        {
            where :{
                id : id,
            },
        },
        );
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_USER_SUCCESS));
    } catch (error){
        console.error (error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_USER_FAIL));
    }
});


//1. 모든 사용자 정보 (id, email, userName ) 리스폰스!
module.exports = router;