var County = require('./models/county');
var glob = require("glob");
var fs = require("fs");
var async = require("async");

function getAllJson() {
    glob("jsonPredict/*.json", function(err, files) {
        if(err) {
            console.log("cannot read the folder, something goes wrong with glob", err);
        }
        var z = 0
        async.whilst(
            function () { return z < 51; },
            function (callback) {
                z += 1;
                console.log(z)
                fs.readFile(files[z], 'utf8', function (err, data) { // Read each file
                    if(err) {
                        console.log("cannot read the file, something goes wrong with the file", err);
                    }
                    var res = data.split(",\n");
                    for (var i = 1; i < res.length; i++){
                        var obj = JSON.parse(res[i]);
                        var county = new County();
                        var geo = parseInt(obj.geography, 10)
                        var industry = parseInt(obj.industry, 10)

                        var earn = parseInt(obj.EarnS, 10)
                        if (isNaN(earn)) {
                            earn = -1
                        }
                        var hire = parseInt(obj.HirN, 10)
                        if (isNaN(hire)) {
                            hire = -1
                        }
                        var sex = parseInt(obj.sex, 10)
                        var emp = parseInt(obj.Emp, 10)
                        if (isNaN(emp)) {
                            emp = -1
                        }
                        var year = parseInt(obj.year, 10)
                        var quarter = parseInt(obj.quarter, 10)
                        var geography = parseInt(obj.geography, 10)
                        if (geo < 100) {
                            county.state = geo;
                        }
                        else {
                            var state = Math.floor(geo/1000)
                            county.state = state
                            county.county = geo - state
                        }      
                        county.occupation = industry
                        county.sex = sex
                        county.hire = hire
                        county.earn = earn
                        county.emp = emp
                        county.year = year
                        county.quarter = quarter
                        county.save(function(err) {
                            callback(); 
                        });
                    };
                });
            },
            function () {
            // 5 seconds have passed, n = 5
            }
        );
    });
};