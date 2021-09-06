const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    likable:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    onModel:{
        type:String,
        required:true,
        enum:['Tweet','Comment']
    }

},{timestamps:true});

const like=mongoose.model('Like',likeSchema);

module.exports=like;