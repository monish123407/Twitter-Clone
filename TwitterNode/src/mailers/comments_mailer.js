const mailer=require('../config/mailer');

const newCommentmailer= function(tweet){
    // console.log(tweet);
    mailer.transporter.sendMail({
        from: 'tweet@gmail.com', // sender address
        to: tweet.user.email, // list of receivers
        subject: "New Comment on Your Tweet", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>New Comment Found?</b>", 
    },(err,info)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log("Email Sent ");
        return;
    });
}

module.exports={
    newCommentmailer
}