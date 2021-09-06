const User = require('../models/user');
const Tweet = require('../models/tweet');
const Comment=require('../models/comment');
const multer = require('multer');
const upload= multer({dest:'./src/uploads'});
const {uploadFile,getFile}=require('../config/s3');
const {unlinkSync}=require('fs')
const profile = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if(!user.avatar) {
            user.avatar = 'e55b8fa8e4f999d45086174b0e8efe00';
        }
        return res.render('users/user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    } catch(err) {
        console.error(err);
        return res.redirect('/'); 
    }    
}
const deleteUser = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);      
        if(user.id== req.user.id)
            {   
                const tweetarray= await Tweet.find({user:user.id});                       
                Tweet.deleteMany({user:user.id},function(err){ 
                    if(err){
                        console.log(err);
                    }       
                })
                Comment.deleteMany({user:user.id},function(err){
                    if(err){
                        console.log(err);
                    }                    
                }) 
                for(let i=0;i<tweetarray.length;i++){
                    Comment.deleteMany({tweet:tweetarray[i].id},function(err){
                        if(err){
                            console.log(err);
                        }                    
                    })
                }
            
            }else{
                req.flash('error',' wrong User');
              
            }
            user.remove();
        req.flash('infoDel','User Removed Successfully!!');
        return res.redirect('/');
        
    } catch(err) {
        console.error(err);
        return res.redirect('/'); 
    }    
}
const profileUpdate = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if(!user.avatar) {
            user.avatar = 'e55b8fa8e4f999d45086174b0e8efe00';
        }
        return res.render('users/user_profile_edit', {
            title: 'User Profile',
            profile_user: user
        });
    } catch(err) {
        console.error(err);
        return res.redirect('/');
    }    
}
const getAvatar = function(req, res) {
    const imgStream = getFile(req.params.key);
    imgStream.pipe(res);
}
const update= function(req,res){
    if(req.user.id == req.params.id){
        // console.log(req.body);
        User.findByIdAndUpdate(req.user.id, req.body, function(err,user){
            if(err){
                console.log("Error in Updating User");
                return res.redirect('back');
            }
            console.log(user);
            return res.redirect('back');
        })
    }else{
        return res.status(401).isAuthenticated('Unauthorised');
    }
}

const signUp = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('users/user_sign_up', {
        title: 'Twitter | Sign Up'
    });
}

const signIn = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('users/user_sign_in', {
        title: 'Twitter | Sign In'
    });
}

const create = function(req, res) {
    if(req.body.password != req.body.confirm_password) {
        req.flash('infoDel','Password Mismatched');
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.error(err);
            return;
        }
        if(!user) {
            User.create(req.body, function(err, user) {
                if(err) {
                    console.error(err);
                    return;
                }
                req.flash('info','Profile Created Successfully');
                return res.redirect('/users/signin');
            })
        } else {
            req.flash('info','User Already SignUp Login Please');
            return res.redirect('/users/signin');
        }
    })
}

const createSession = function(req, res) {
    
    req.flash('info','Signed In Successfully');
    return res.redirect('/');
}

const destroySession = function(req, res) {
    req.logout();
    req.flash('info','Signed Out Successfully');
    // console.log(req);
    return res.redirect('/');
}
const updateAvatar= async function(req,res){
    
    const file = req.file;
    try{
    const result = await uploadFile(file);
    // console.log(file);
    unlinkSync(file.path);
    const currUser=req.user.id;
    // console.log(result);
    User.findByIdAndUpdate(currUser,{avatar:result.Key} , function(err,user){
        if(err){
            console.log(err);
            return res.redirect('/');
        }
        return res.redirect('back');
    });

    }
    catch(err){
        console.log(err);
        return res.redirect('/');
    }
    // console.log(file);
    // console.log(result);
    // return res.redirect('/');
    
}

module.exports = {
    profile,
    profileUpdate,
    signIn,
    signUp,
    create,
    createSession,
    destroySession,
    update,
    updateAvatar,
    deleteUser,
    getAvatar
};