var County = require('./models/county');
var glob = require("glob");
var fs = require("fs");


function getAllJson() {
    glob("jsonData/*.json", function(err, files) {
      if(err) {
        console.log("cannot read the folder, something goes wrong with glob", err);
      }
      var z = 0
      files.forEach(function(file) {
        fs.readFile(file, 'utf8', function (err, data) { // Read each file
          if(err) {
            console.log("cannot read the file, something goes wrong with the file", err);
          }
          var res = data.split(",\n");
          //console.log(res);
          for (var i = 1; i < res.length; i++){
            var obj = JSON.parse(res[i]);
            var county = new County();
            var geo = parseInt(obj.geography, 10)
            var industry = parseInt(obj.industry, 10)

            var earn = parseInt(obj.EarnS, 10)
            if (earn == null) {
                earn = -1
            }
            var hire = parseInt(obj.HirN, 10)
            if (hire == null) {
                hire = -1
            }
            var sex = parseInt(obj.sex, 10)
            var emp = parseInt(obj.Emp, 10)
            if (emp == null) {
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
            county.save();
          }
          z += 1;
          console.log(z)
          
          //console.log(data) 
        });
      });
    });
}



exports.loadCounties = function() {
    getAllJson();
}