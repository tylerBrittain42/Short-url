const Url = require('../models/url')

exports.get_home = function(req, res) {

    res.render('index')

}

exports.create_url = async function(req, res) {

    //Finding the current max_id
    let maxId = await Url.find({}).
    select('numeric_id').
    sort('-numeric_id').
    limit(1).
    exec()

    const numeric_id = ((maxId < 1) ? 0 : (maxId[0].numeric_id + 1))

    const newUrl = new Url({
        original:req.body.long_link,
        newUrl: toShort(numeric_id),
        numeric_id: numeric_id
    })

    newUrl.save((e) => {
        if(e){
            console.log(e)
            res.render('error',{error:e})
        }
        else{
            res.render('result', {url: newUrl.original, shortUrl:newUrl.newUrl})
        }
    })
}

exports.get_all = async function(req, res) {

    const query = await Url.find({}).select('original newUrl').exec()
    res.render('all', {urlData:query})
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

// followed this pseudo code 
// https://stackoverflow.com/questions/742013/how-do-i-create-a-url-shortener?answertab=votes#tab-top
function base62(id){

    let newUrl = []
    let remainder = 0

    while(id > 0){
        remainder = id % 62
        newUrl.push(remainder)
        id = Math.floor(id / 62)
    }

    // Adds additional empty elements to ensure a 3 digit value
    while(newUrl.length < 3){
        newUrl.push(0)
    }
    newUrl.reverse()
    
    return newUrl
}

//converts a base 62 number to a short url
function toShort(numeric_id) {
    
    const base62_id = base62(numeric_id)
    const key = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let shortUrl = ''

    base62_id.forEach(element => {
        shortUrl += key[element]
    });

    return shortUrl

}