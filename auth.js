var jf = require("jsonfile");

var studentsInfoFilepath =  './private/students_info.json';
var studentsInfo = jf.readFileSync(studentsInfoFilepath);

function isAllowed(phone) {
    return studentsInfo.hasOwnProperty(phone);
}

function getHouse(phone) {
	return studentsInfo.phone.house;
}

function isOGL(phone) {
	return studentsInfo.phone.ogl;
}

module.exports = {
    isAllowed: isAllowed
};
