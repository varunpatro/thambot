var jf = require("jsonfile");

var studentsInfoFilepath =  './private/students_info.json';
var studentsInfo = jf.readFileSync(studentsInfoFilepath);

function isAllowed(phone) {
    studentsInfo = jf.readFileSync(studentsInfoFilepath);
    return studentsInfo.hasOwnProperty(phone);
}

function getHouse(phone) {
	console.log(studentsInfo[phone].house);
	return studentsInfo[phone].house;
}

function isOGL(phone) {
	return studentsInfo[phone].ogl;
}

function getFirstName(phone) {
	return studentsInfo[phone].firstname;
}

function isLordAlmighty(phone) {
	return studentsInfo[phone].lordAlmighty;
}

module.exports = {
    isAllowed: isAllowed,
    getHouse: getHouse,
    isOGL: isOGL,
    getFirstName: getFirstName,
    isLordAlmighty: isLordAlmighty
};
