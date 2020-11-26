const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const {User} = require('../models');

module.exports = {
    signup : async (req, res) => {
        const {email, password, userName } = req.body;
    
        if (!email || !password || !userName) {
            console.log('필요한 값이 없습니다!');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE));
        }
    
        try{
            const alreadyEmail = await User.findOne({
                where:{
                    email : email,
                }
            });
            if (alreadyEmail){
                console.log('이미 존재하는 이메일 입니다.');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
            }
    
            const salt = crypto.randomBytes(64).toString('base64');
            const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    
            const user = await User.create({
                email : email,
                password : hashedPassword,
                userName : userName,
                salt : salt,
            });
    
            console.log(user);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, {id: user.id, email, userName}));
        } catch (error){
            console.error(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_IN_FAIL));
        }
    }
}