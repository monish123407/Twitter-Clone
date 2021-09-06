const Tweet = require('../models/tweet');
const Comment = require('../models/comment');
const create = async function(req, res) {
    try {
        await Tweet.create({
            content: req.body.content,
            user: req.user._id
        }); 
        req.flash('info','Tweet Created Successfully');
        return res.redirect('back');
        
    } catch (err) {
        console.error("Error In Creating A Tweet");
    }
}
const destroy = async function(req,res){
    try {
        const tweet=await Tweet.findById(req.params.id);

            if(tweet.user== req.user.id)
            {
                tweet.remove();
                Comment.deleteMany({tweet:req.params._id},function(err){
                    req.flash('infoDel','Tweet deleted Successfully');
                    return res.redirect('back');
                })
            }else{
                req.flash('error',' wrong User');
                return res.redirect('back');
            }
    
    } catch (err) {
        return res.redirect('/');
    }
}

module.exports = {create , destroy};
