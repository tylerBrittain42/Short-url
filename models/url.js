const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema(
    {
        original: {type: String, required: true},
        newUrl: {type: String, required: true},
        // timesClicked: {type: Number, default: 0},
        numeric_id: {type: Number, required:true}
    }
)

module.exports = mongoose.model('Url', UrlSchema)