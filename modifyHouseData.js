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
                            console.log("::::" + house.points);
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
                                                        console.log("::::" + house.points);

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

/////////////////////////////////////////////////////////////////////////////////////////////////////// LETTERS

function addLetter(houseName, letterToAdd) {
    for (var house_name in houses_obj) {
        if(houses_obj.hasOwnProperty(house_name)) {
            var house = houses_obj[house_name];
            for(var letters in house) {
                if (letters == "letters") {
                    if (house.hasOwnProperty(letters)) {
                        if (houseName == house_name) {
                            house.letters.push(letterToAdd);
                        }
                    }
                }
            }
        }
    }

    fs.writeFile(housesFilepath, JSON.stringify(houses_obj));
    return "Added. Current letters for " + houses_obj[houseName].name + ": " + houses_obj[houseName].letters;
}
function clearLetters(houseName) {
    for (var house_name in houses_obj) {
        if(houses_obj.hasOwnProperty(house_name)) {
            var house = houses_obj[house_name];
            for(var letters in house) {
                if (letters == "letters") {
                    if (house.hasOwnProperty(letters)) {
                        if (houseName == house_name) {
                            house.letters = [];
                        }
                    }
                }
            }
        }
    }

    fs.writeFile(housesFilepath, JSON.stringify(houses_obj));
    return "Cleared. Current letters for " + houses_obj[houseName].name + ": " + houses_obj[houseName].letters;
}

function getLetters(house_name) {
	return houses_obj[house_name].name + " has the following letters: \n" + houses_obj[house_name].letters;
}

module.exports = {
    'getPoints': getPoints,
    'addPoints': addPoints,
    'subtractPoints': subtractPoints,
    'getLetters': getLetters,
    'addLetter': addLetter,
    'clearLetters': clearLetters
};