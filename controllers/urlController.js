const Url = require('../models/url')
const {validationResult} = require('express-validator');
const base62 = require('./base62')


exports.get_home = function(req, res) {
    res.render('index')
}

exports.create_url = async function(req, res) {

    // Triggers if req is not a valid url
    if(!validationResult(req).isEmpty()){
        res.redirect('/')
        return
    }

    // Removes http and https from the url before it is stored in the database
    if(req.body.long_link.includes('http://') || req.body.long_link.includes('https://')){
        req.body.long_link = req.body.long_link.replace("https://","")
        req.body.long_link = req.body.long_link.replace("http://","")
    }

    //Finding the current max_id
    let maxId = await Url.find({}).
    select('numeric_id').
    sort('-numeric_id').
    limit(1).
    exec()

    // If the database is empty, set numeric_id to 0
    // else set to maxId + 1
    const numeric_id = ((maxId < 1) ? 0 : (maxId[0].numeric_id + 1))

    const newUrl = new Url({
        original:req.body.long_link,
        newUrl: base62.toShort(numeric_id),
        numeric_id: numeric_id
    })

    newUrl.save((e) => {
        if(e){
            console.log(e)
            res.render('error',{error:e})
        }
        else{
            res.render('result', {url: newUrl.original, shortUrl:newUrl.newUrl,host:process.env.HOST})
        }
    })
}

exports.get_all = async function(req, res) {

    const query = await Url.find({}).select('original newUrl').exec()
    res.render('all', {urlData:query, host:process.env.HOST})
}

exports.redirect_short_url = async function(req, res) {
    
    try {
        const query = await Url.find({newUrl:req.params.shortUrl}).
        select('original').
        exec()
        const destination = query[0].original
        res.redirect('http://' + destination)
    }
    catch (e) {
        res.render('error', {error:e})
    }
    
}

exports.get_about = function(req, res){
    res.render('about')
}

