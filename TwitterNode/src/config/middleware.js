const setFlash = function(req,res,next){
    // console.log(res);
    res.locals.flash ={
        'success': req.flash('success'),
        'error' : req.flash('error'),
        'info':req.flash('info'),
        'infoDel':req.flash('infoDel'),
        'tweet_create':req.flash('tweet_create')
    }
    next();
}

module.exports ={
    setFlash,
}