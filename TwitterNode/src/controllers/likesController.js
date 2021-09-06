const Like = require('../models/like');
const Comment = require('../models/comment');
const Tweet = require('../models/tweet');

const toggleLike = async function(req,res){
    try {
        let likable;
        let deleted=false;
        if(req.query.type = 'Tweet'){
            likable = await Tweet.findById(req.query.id).populate('likes').exec();
        }
        else if(req.query.type = 'Comment'){
            likable = await Comment.findById(req.query.id).populate('likes').exec();
        }
        else{
                return res.json(400);
        }
        
        let exists = await Like.findOne({
            likable : req.query.id,
            onModel : req.query.type,
            user: req.query._id,
        });

        if(exists){
            likable.likes.pull(exists._id);
            likable.save();
            exists.remove();
            deleted=true;
        }else{
            let newLikeObject = await Like.create({
                user: req.user._id,
                likable: req.query._id,
                onModel: req.query.type
            });
            likable.likes.push(newLikeObject);
            likable.save();
        }
        return res.json(200,{
                message:'Success in Like',
                data:{
                    deleted :deleted,
                }
        })

    } catch (err) {
        console.log(err);
        return res.json(500);
    }
}


module.exports = {
    toggleLike
}