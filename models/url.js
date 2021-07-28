const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema(
    {
        original: {type: string, required: true},
        newURl: {type: string, required: true},
        timesClicked: {type: Number, default: 0}
    }
)

module.exports = mongoose.model('Url', UrlSchema)