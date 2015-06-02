var jf = require("jsonfile");

var studentsInfoFilepath =  './private/students_info.json';
var studentsInfo = jf.readFileSync(studentsInfoFilepath);

function isAllowed(phone) {
    return studentsInfo.hasOwnProperty(phone);
}

function getHouse(phone) {
	var key = "house";
	console.log(studentsInfo.phone.key);
	return studentsInfo.phone.key;
}

function isOGL(phone) {
	return studentsInfo.phone.ogl;
}

module.exports = {
    isAllowed: isAllowed,
    getHouse: getHouse,
    isOGL: isOGL
};
