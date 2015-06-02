//@author YW
/**
 "6593716368": {
        "firstname": "Varun",
        "lastname": "Patro",
        "matric": "A0131729E",
        "email": "varunpatro@u.nus.edu",
        "ogl": true,
        "house": "ianthe"
    },
    **/

var fs = require('fs');
var jf = require("jsonfile");
var studentsInfoFilepath =  './private/students_info.json';
var studentsInfo_obj =  JSON.parse(fs.readFileSync(studentsInfoFilepath).toString()); //OBJECT

function addOGL(phone, firstname, lastname, matric, house) {
    if (studentsInfo_obj.hasOwnProperty(phone)) {
        return "You're already registered, you dummy!";
    } 
    if (!isValidMatric(matric)) {
        return "Bad matric number!";
    }
    if (!isValidHouse(house)) {
        return "That's not one of the houses...";
    }
    Object.defineProperty(studentsInfo_obj,phone,{
        value: { firstname: firstname,
                lastname: lastname,
                matric: matric.toUpperCase(),
                ogl: true,
                house: house },
        enumerable: true
    });
    

    fs.writeFile(studentsInfoFilepath, JSON.stringify(studentsInfo_obj));
    return "Added!";
}

function revokeOGL(phone) {
    for (var phone in studentsInfo_obj) {
        if(studentsInfo_obj.hasOwnProperty(phone)) {
            var student = studentsInfo_obj[phone];
            for(var property in student) {
                if (property == "ogl") {
                    if (student.hasOwnProperty(property)) {
                        if (student.ogl == true) {
                            student.ogl = false;
                        }
                    }
                }
            }
        }
    }
    console.log(JSON.stringify(houses_obj));

   // fs.writeFile(housesFilepath, JSON.stringify(houses_obj));
    return "REVOKED";
}

function isValidMatric(matric) {
    var m = matric.toUpperCase();
    if(m[0] != 'A' || m.length != 9 || m[1] != 0) {
        return false;
    } 
    if(!isNaN(m[8]) || isNaN(m.substr(1,7))) {
        return false;
    } 
    return true;
}

function isValidHouse(house) {
    var houses = ['ankaa', 'nocturna', 'ianthe', 'triton', 'ursaia', 'saren'];
    for(var i=0; i<houses.length; i++) {
        if (house == houses[i]) {
            return true;
        }
    }
    return false;
}

module.exports = {
    'addOGL': addOGL,
    'revokeOGL': revokeOGL
};