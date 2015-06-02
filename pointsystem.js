var jf = require("jsonfile");

var housesFilepath =  './houses.json';
var houses = jf.readFileSync(housesFilepath);

function getPoints(house) {
	return houses[house].name + " has " + houses[house].points + " points.";
}

function addPoints(house, n) {
    var housePoints = houses[house].points;
    console.log('n: ' + n);
    console.log('housepoints: ' + houses[house].points);
	houses[house].points = housePoints*1+(n*1);
    console.log(houses[house].points);
	return "Added. Current points for " + houses[house].name + ": " + houses[house].points;
}

function subtractPoints(house, n) {
	houses[house].points -= n;
	return "Subtracted. Current points for " + houses[house].name + ": " + houses[house].points;
}

module.exports = {
    'getPoints': getPoints,
    'addPoints': addPoints,
    'delPoints': subtractPoints
};