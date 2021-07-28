exports.get_home = function(req, res) {
    res.render('index')
}

exports.create_url = function(req, res) {
    console.log(req.body)
    res.send('not created yet')
}

exports.get_all = function(req, res) {
    res.render('all')
}

exports.redirect_short_url = function(req, res) {
    console.log(req.params.shortUrl)
    res.send('not created yet')
}