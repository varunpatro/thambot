/** @author YW
Only reads houses.json once, at start of server.
For as long as server running, uses houses_obj for data manipulation, and writes to file.
**/

var fs = require('fs');
var jf = require("jsonfile");

var housesFilepath =  './houses.json';
var houses_obj = JSON.parse(fs.readFileSync(housesFilepath).toString()); //OBJECT
//var houses_str1 = fs.readFileSync(housesFilepath).toString(); //string SPACES 
//var houses = jf.readFileSync(housesFilepath); //string NO SPACES

function addPoints(houseName, pointsToAdd) {
    for (var house_name in houses_obj) {
        if(houses_obj.hasOwnProperty(house_name)) {
            var house = houses_obj[house_name];
            for(var points in house) {
                if (points == "points") {
                    if (house.hasOwnProperty(points)) {
                        if (houseName == house_name) {
                            house.points = house.points*1 + pointsToAdd*1;
                        }
                    }
                }
            }
        }
    }
    
    fs.writeFile(housesFilepath, JSON.stringify(houses_obj));
    return "Added. Current points for " + houses_obj[houseName].name + ": " + houses_obj[houseName].points;
}
function subtractPoints(houseName, pointsToSubtract) {
    for (var house_name in houses_obj) {
        if(houses_obj.hasOwnProperty(house_name)) {
            var house = houses_obj[house_name];
            for(var points in house) {
                if (points == "points") {
                    if (house.hasOwnProperty(points)) {
                        if (houseName == house_name) {
                            house.points = house.points*1 - pointsToSubtract*1;
                        }
                    }
                }
            }
        }
    }
    
    fs.writeFile(housesFilepath, JSON.stringify(houses_obj));
	return "Subtracted. Current points for " + houses_obj[houseName].name + ": " + houses_obj[houseName].points;
}

function getPoints(house_name) {
	return houses_obj[house_name].name + " has " + houses_obj[house_name].points + " points.";
}

module.exports = {
    'getPoints': getPoints,
    'addPoints': addPoints,
    'subtractPoints': subtractPoints,
};