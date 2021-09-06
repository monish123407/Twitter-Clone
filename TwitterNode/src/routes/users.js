const express = require('express');
const passport = require('passport');
const multer = require('multer');
const upload= multer({dest:'./src/uploads'});
const {
    profile, 
    signIn, 
    signUp, 
    create, 
    createSession,
    deleteUser,
    update, 
    profileUpdate,
    destroySession,
    getAvatar,
    updateAvatar} = require('../controllers/userController');

const router = express.Router();

router.get('/profile/:id', passport.checkAuthentication, profile);
router.get('/deleleUser/:id', passport.checkAuthentication, deleteUser);
router.post('/update/:id',passport.checkAuthentication,update);
router.get('/startupdate/:id',passport.checkAuthentication,profileUpdate);
router.get('/images/:key',getAvatar);
router.get('/signin', signIn);
router.get('/signup', signUp); 
router.post('/create', create);
router.post('/updateAvatar',passport.checkAuthentication,upload.single('avatar'),updateAvatar)

router.post('/create-session', passport.authenticate(
    'local',
    { 
    failureRedirect: '/signin'}
),createSession);

router.get('/signout', destroySession);

module.exports = router;