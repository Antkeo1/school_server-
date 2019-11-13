const express = require('express');
const router = express.Router();

const {userById, 
        allUsers, getUser, 
        updateUser, deleteUser, 
        userPhoto, 
        addFollowing, addFollower, 
        removeFollower, removeFollowing,
        findPeople, joinGroup,
        leaveGroup, hasAuthorization } = require('../controllers/user');
const {requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const {removeMember, addMember} = require('../controllers/group');

router.put('/user/follow', requireSignin, addFollowing, addFollower)
router.put('/user/unfollow', requireSignin, removeFollowing, removeFollower)


// group routes for user
router.put('/user/joingroup', requireSignin, addMember, joinGroup)
router.put('/user/leavegroup', requireSignin, removeMember, leaveGroup)

router.get('/users', allUsers) // to see all users
router.get('/user/:userId', requireSignin, getUser) // to see single user
router.put('/user/:userId', requireSignin, hasAuthorization, updateUser) // to update
router.delete('/user/:userId', requireSignin, hasAuthorization, deleteUser) // to deletes

//photo
router.get('/user/photo/:userId', userPhoto)

// //files
// router.post('/user/upload', upload)

// suggested followers
router.get('/user/findpeople/:userId', requireSignin, findPeople)

router.param('userId', userById)

module.exports = router;