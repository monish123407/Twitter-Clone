const Tweet = require('../models/tweet');
const User = require('../models/user');

module.exports.root = async function(req, res) {
    try{
        const tweets=await Tweet.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).sort({"createdAt":-1}).exec() 
        
        let fetchedTweets = tweets;
        let fetchUser=await User.find({});
        
        return res.render('home', {
            title: "Twitter", 
            tweets: fetchedTweets , 
            users:fetchUser
        });
    }catch(err){
        console.error(err);
        return;
    }
    
}