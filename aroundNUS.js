var jf = require("jsonfile");

var stationsFilepath =  './stations.json';
var stations = jf.readFileSync(stationsFilepath);
var stationsArray; var passwordsArray;
readStations(stations);
console.log(passwordsArray);

var wrongPasswordMsg = "Wrong password!";

function getTask(password) {
	for(var i=0; i<passwordsArray.length; i++) {
        if (password == passwordsArray[i]) {
            return stationsArray[i].task;
        }
    }
    return wrongPasswordMsg;
}



function readStations(station_list) {
    var arr_stations = [];
    var arr_passwords = [];
    for (var station_name in station_list) {
        if (station_list.hasOwnProperty(station_name)) {
            var station = station_list[station_name];
            arr_stations.push(station);
            for (var password in station) {
                if(password == "password") {
                    if(station.hasOwnProperty(password)){
                        arr_passwords.push(station[password]);
                    }  
                }
            }
        }
    }
    stationsArray = arr_stations;
    passwordsArray = arr_passwords;
}


module.exports = {
    'getTask': getTask
};