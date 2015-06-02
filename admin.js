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
    if (matric.length !=9) {
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
    'addOGL': addOGL
};