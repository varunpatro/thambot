var jf = require("jsonfile");

var stationsFilepath =  './stations.json';
var stations = jf.readFileSync(stationsFilepath);

var wrongPasswordMsg = "Wrong password!";

function getTask(password) {
	if (password == "game_start") {
		console.log(stations.s1.task);
		return stations.s1.task;
	}
	else {
		console.log(wrongPasswordMsg);
		return wrongPasswordMsg;
	}
}

module.exports = {
    'getTask': getTask
};