var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var countySchema   = new Schema({
    state: Number,
    county: Number,
    occupation: Number,
    sex: Number,
    hire: Number,
    earn: Number,
    emp: Number,
    year: Number,
    quarter: Number
});
 
module.exports = mongoose.model('County', countySchema);