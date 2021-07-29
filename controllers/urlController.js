const Url = require('../models/url')

exports.get_home = function(req, res) {

    const test = new Url({
        original:'google.com',
        newUrl:'yes',
        numeric_id:69
    })
    test.save()
    res.render('index')
}

exports.create_url = async function(req, res) {

    //Finding the current max_id
    let maxId = await Url.find({}).
    select('numeric_id').
    sort('-numeric_id').
    limit(1).
    exec()

    const newUrl = new Url({
        original:req.body.long_link,
        newUrl: 'temporary',
        numeric_id: ((maxId < 1) ? 0 : (maxId[0].numeric_id + 1))
    })

    newUrl.save((e) => {
        if(e){
            console.log(e)
            res.render('error')
        }
        else{
            res.render('result')
        }
    })
}

exports.get_all = function(req, res) {
    res.render('all')
}

exports.redirect_short_url = async function(req, res) {
    
    // console.log(req.params.shortUrl)
    const query = await Url.find({newUrl:'yes'}).
    select('original').
    exec()

    const destination = query[0].original
    res.redirect('http://' + destination)

}