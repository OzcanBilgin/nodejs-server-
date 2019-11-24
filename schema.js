var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var getirSchema = new Schema({
    "createdAt": Date,
    "totalCount": Number
})
var GetirSchema = mongoose.model('GetirSchema', getirSchema);
module.exports = GetirSchema;