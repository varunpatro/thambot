var jf = require("jsonfile");

var housesFilepath =  './houses.json';
var houses = jf.readFileSync(housesFilepath);

function getPoints(house) {
	return houses[house].name + " has " + houses[house].points + " points.";
}

function addPoints(house, n) {
	houses[house].points += n;
	return "Added. Current points for " + houses[house].name + ": " + houses[house].points;
}

function delPoints(house, n) {
	houses[house].points -= n;
	return "Deleted. Current points for " + houses[house].name + ": " + houses[house].points;
}

module.exports = {
    'getPoints': getPoints,
    'addPoints': addPoints,
    'delPoints': delPoints
};