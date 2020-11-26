const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');

/** Post localhost : 3000/posts */
router.post('/', postController.createPost);

/** [GET] local  */
router.get('/', postController.readAllPosts);

router.post('/:postId/like', postController.createLike);

/** [DELETE] local */
router.delete('/:postId/like', postController.deleteLike);

module.exports = router;