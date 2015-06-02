var fs = require('fs');
var jf = require("jsonfile");

var housesFilepath =  './houses.json';
var houses = jf.readFileSync(housesFilepath); //string NO SPACES
var houses_obj = JSON.parse(fs.readFileSync(housesFilepath).toString()); //OBJECT
var houses_str1 = fs.readFileSync(housesFilepath).toString(); //string SPACES 

console.log(houses_obj);
console.log('vs \n' + houses);
console.log('\n vs \n' + houses_str1);

function readLogs() {
    return filecontents;
}


function addPoints(houseName, newPoints) {
    for (var house_name in houses_obj) {
        if(houses_obj.hasOwnProperty(house_name)) {
            var house = houses_obj[house_name];
            for(var points in house) {
                if (points == "points") {
                    if (house.hasOwnProperty(points)) {
                        if (houseName == house_name) {
                            house.points = house.points*1 + newPoints*1;
                        }
                    }
                }
            }
        }
    }
    
    fs.writeFile(housesFilepath, JSON.stringify(houses_obj));
    return "Added. Current points for " + houses[house].name + ": " + houses[house].points;
}


function logMessage(request, response) {
    filecontents[request.date] = {
        'request': request,
        'response': response
    };
}

function storeLogs() {
    jf.writeFile(file, filecontents, function(err) {
        // console.log(err);
    });
}

module.exports = {
    readLogs: readLogs,
    logMessage: logMessage,
    storeLogs: storeLogs
};


function getPoints(house) {
	return houses[house].name + " has " + houses[house].points + " points.";
}


function subtractPoints(house, n) {
	houses[house].points -= n;
	return "Subtracted. Current points for " + houses[house].name + ": " + houses[house].points;
}

module.exports = {
    'getPoints': getPoints,
    'addPoints': addPoints,
    'delPoints': subtractPoints,
    'updateHousePoints': updateHousePoints
};