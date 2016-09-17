var Ranking = require('./models/ranking.js');
var glob = require("glob");
var fs = require("fs");
var async = require("async");
console.log("IS THIS BEING RUN")

function getAllJson() {
    var ranks = []
    glob("jsonPredict/*.json", function(err, files) {
        if(err) {
            console.log("cannot read the folder, something goes wrong with glob", err);
        }
        for (var i = 0; i < files.length; i++) {
                fs.readFile(files[i], 'utf8', function (err, data) { // Read each file
                    if(err) {
                        console.log("cannot read the file, something goes wrong with the file", err);
                    }
                    var obj = JSON.parse(data);
                    for(var prop in obj) {
                        if (obj[prop][1] == null) {
                            break;
                        }
                        var state;
                        var county;
                        
                        if (prop < 100) {
                            state = prop
                            county = 0
                        }
                        else {
                            state = Math.floor(prop/1000);
                            county = prop % 1000;
                        }
                        for (var job in obj[prop]) {
                            for (var sex in obj[prop][job]) {
                                var rank = new Ranking();
                                rank.state = state;
                                rank.county = county;
                                rank.occupation = job;
                                rank.sex = sex;
                                rank.EarnSL = Math.round(obj[prop][job][sex]["EarnSL"]),
                                rank.EarnSPred = Math.round(obj[prop][job][sex]["EarnSPred"]),
                                rank.EmpL = Math.round(obj[prop][job][sex]["EmpL"]),
                                rank.EmpPred = Math.round(obj[prop][job][sex]["EmpPred"]),
                                rank.HirNL = Math.round(obj[prop][job][sex]["HirNL"]),
                                rank.HirNPred = Math.round(obj[prop][job][sex]["HirNPred"]),
                                rank.RatioL = obj[prop][job][sex]["RatioL"],
                                rank.RatioPred = obj[prop][job][sex]["RatioPred"]
                                rank.save(function(err) {
                                    console.log('this fires after the `post` hook');
                                });

                            }
                        }
                        //if (z < 50){callback();}
                        
                    }
                });
        }
    });
    
};

exports.loadRankings = function() {
    getAllJson();
}