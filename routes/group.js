const express = require('express');
const router = express.Router();

const {createGroup, getGroups, 
        removeMember, groupById, 
        deleteGroup, updateGroup,
        groupsByUser, singleGroup,
        groupAdmin, groupPhoto, 
        comment, uncomment, message, unmessage
    } = require('../controllers/group');
    const { userById, userPhoto } = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');
const { createGroupValidator } = require('../validator');

router.get('/groups', getGroups)

router.put('/group/comment', requireSignin, comment);
router.put('/group/uncomment', requireSignin, uncomment);

router.put('/group/message', requireSignin, message);
router.put('/group/unmessage', requireSignin, unmessage);

router.post('/group/new/:userId', requireSignin, createGroup, createGroupValidator);
router.put('/group/remove/:groupId', requireSignin, removeMember)
router.get('/groups/by/:userId', groupsByUser);
router.get('/group/:groupId', singleGroup);
router.put('/group/:groupId', requireSignin, groupAdmin, updateGroup);
router.delete('/group/:groupId', requireSignin, groupAdmin, deleteGroup);

router.get('/group/photo/:groupId', groupPhoto);

router.param('userId', userById)
router.param('groupId', groupById);

module.exports = router;