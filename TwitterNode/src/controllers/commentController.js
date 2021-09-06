const Comment = require('../models/comment');
const Tweet = require('../models/tweet');
const {newCommentmailer}=require('../mailers/comments_mailer')

const create = async function(req, res) {
    try {
        // console.log(re  /q.body);
        const tweet = await Tweet.findById(req.body.tweet).populate('user').exec();
        const comment =await  Comment.create({
                content: req.body.content,
                tweet: req.body.tweet,
                user: req.user._id
            });
                tweet.comments.push(comment);
                tweet.save();
                // console.log(req.user._id,tweet.user._id);
                if(req.user._id.toString() == tweet.user._id.toString()){                
                }
                else{
                    // newCommentmailer(tweet);
                    console.log("MailSent");
                }
                req.flash('info','Comment Added SuccessFully');
                return res.redirect('/'); 
    } catch (err) {
        console.error('Error finding tweet');
            return res.redirect('/');
    }
}

const destroy = async function(req,res){
    // console.log(req);
    try {
        const comment = await Comment.findById(req.params.id); 
            if(comment.user== req.user.id)
            {
                let tweetid = comment.tweet;
                comment.remove();
                Tweet.findByIdAndUpdate(tweetid,{$pull:{comments: req.params.id}},function(err){
                    req.flash('infoDel','Comment Deleted SuccessFully');
                    return res.redirect('back');

                })
            }else{
                return res.redirect('back');
            }
    
    } catch (err) {
        return res.redirect('/');
    }
}

module.exports = {
    create,
    destroy
};