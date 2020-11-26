const { User, Post, Like } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage')

module.exports = {
    createPost : async (req, res) => {
        const { userId, title, contents } = req.body;
        try {
            const user = await User.findOne( { where : {id: userId }});
            const post = await Post.create({ title, contents });
            //await user.addPost(post);
            return res.status(sc.Ok).send(ut.success.OK, rm.CREATE_POST_SUCCESS);
        } catch (err){
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR). send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
        }
    },
    readAllPosts : async (req, res) => {
        try {
            const posts = await Post.findAll({
                include: [{
                    model: User,
                }]
            });
            console.log(JSON.stringify(posts, null, 2));
            return res
                .status(sc.OK)
                .send(ut.success(sc.OK, rm.READ_POST_ALL_SUCCESS, posts));
        } catch (err) {
            console.log(err);
            return res
                .status(sc.INTERNAL_SERVER_ERROR)
                .send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.READ_POST_ALL_FAIL));
        }
    },
    createLike : async (req, res) => {
        const id = req.params.postId;
        const UserId = req.body.userId;
        try {
            const like = await Like.create({ UserId, PostId });
            return res.status(sc.OK).send(ut.success, rm.CREATE_LIKE_SUCCESS);
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(sc.INTERNAL_SERVER_ERROR, rm.CREATE_LIKE_FAIL);
        }
    },
    //where : {UserId, PostId } where절 작성 -> DELETE : sequelize에서는 destroy로 !
    deleteLike : async (req, res) => {
        const id = req.params.postId;
        const UserId = req.body.userId;

        try {
            const like = await Like.destroy({
                where: {
                    UserId,
                    PostId
                },
            });
            return res.status(sc.OK).send(ut.success, rm.DELETE_LIKE_SUCCESS);
        } catch (err){
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(sc.INTERNAL_SERVER_ERROR, rm.DELETE_LIKE_FAIL);
        }
    },
}

