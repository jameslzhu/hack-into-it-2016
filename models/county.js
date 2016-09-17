var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var countySchema   = new Schema({
    id: String
});
 
module.exports = mongoose.model('County', counSchema);