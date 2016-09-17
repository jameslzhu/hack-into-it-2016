var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var countySchema   = new Schema({
    state: String,
    county: String,
    occupation: int,
    sex: int,
    age: int,
    hire: int,
    earn: double,
    quarter: int
});
 
module.exports = mongoose.model('County', counSchema);