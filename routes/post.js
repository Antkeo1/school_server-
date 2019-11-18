const express = require('express');
const {
   getPosts,
    createPost,
    postsByUser,
    postById,
    isPoster,
    updatePost,
    deletePost,
    photo,
    singlePost,
    like,
    unlike,
    comment,
    uncomment,
    updateComment,
    postsForTimeline
} = require('../controllers/post');

const { groupById, postByMembers } = require('../controllers/group')
const { requireSignin } = require('../controllers/auth');
const { userById, userPhoto,  } = require('../controllers/user');
const { createPostValidator } = require('../validator');

const router = express.Router();

router.get('/posts/:userId', userById, postsForTimeline);
router.get('/groups/:groupId', groupById, postByMembers);

// like unlike
router.put('/post/like', requireSignin, like);
router.put('/post/unlike', requireSignin, unlike);

// comments
router.put('/post/comment', requireSignin, comment);
router.put('/post/uncomment', requireSignin, uncomment);
router.put('/post/updatecomment', requireSignin, updateComment);

// post routes
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.get('/post/:postId', singlePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);


// photo
router.get('/post/photo/:postId', photo);

// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :postId, our app will first execute postById()
router.param('postId', postById);
router.param('groupId', groupById);
module.exports = router;
