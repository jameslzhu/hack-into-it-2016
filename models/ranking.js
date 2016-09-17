var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var rankingSchema   = new Schema({
    state: Number,
    county: Number,
    occupation: Number,
    sex: Number,
    EarnSL: Number,
    EarnSPred: Number,
    EmpL: Number,
    EmpPred: Number,
    HirNL: Number,
    HirNPred: Number,
    RatioL: Number,
    RatioPred: Number
});
 
module.exports = mongoose.model('Ranking', rankingSchema);