var auth = require('./auth');
var util = require('./util');
var aroundNUS = require('./aroundNUS');
var dataManip = require('./modifyHouseData');
var admin = require('./admin');
var broadcaster = require('./broadcaster');

var invalidUserMessage = "Hi, you're not registered in the Thambot server. Please contact your OGL to register.";
var notOGLMessage = "Hey, you're not an OGL!";
var helpMessage =
    'Here\'s what you can ask Thambot! ' + 
    '\nType /points to get your house\'s current points.' +
    '\nType /password [PASSWORD] to enter in a password for an AcrossNUS station.' + 
    "\nType /ogl if you are an OGL for special OGL commands.";

var errorMessage_syntax =
    'Thambot didn\'t understand that command. Thambot is confused! Type \'/help\' for more' +
    ' information.';
var errorMessage_NaN = 
    "That's not a number Thambot knows how to add or subtract :( \nNumbers look like this: 1, 2, 3, 34583489"; 

var oglHelpMessage = 
    'Type /addpoints [number] to add points.\nType /subtractpoints [number] to subtract points. \nType /addletters [letter] to add a letter.';

function request(msgObj, callback) { //msg object. Returns a msgObj
    var msgFrom = util.getPhoneNum(msgObj.from);
    var msgRequest = msgObj.body;
    var msgType = '';
    var msgResponse = '';
    
    
    if (!auth.isAllowed(msgFrom)) {
        if (isRegisterRequest(msgRequest)){
            msgResponse = processRegisterRequest(msgRequest, msgFrom);
        } else {    
            msgResponse = invalidUserMessage;
        }
    } else {
        msgResponse = parseCmd(msgRequest, msgFrom, msgObj, callback);
        msgType = responseType(msgRequest);
    }

    return {
        phone: msgFrom,
        type: msgType,
        message: msgResponse
    };
}

function isRegisterRequest(input) {
    if (input[0] == '/') {
        var cmd = input.substr(1).split(',');
        console.log(cmd);
        if (cmd[0] == 'registerme') {
            return true;
        } else {
            return false;
        }
    }
}
function processRegisterRequest(input, phone) {
    var cmd = input.substr(1).split(',');
    if (cmd[1] != 'imcoolenough') {
        return "You failed the security measure";
    }
    if (cmd.length < 6) {
        return "You messed up. Try again";
    }
    return admin.addOGL(phone, cmd[2].trim(), cmd[3].trim(), cmd[4].trim(), cmd[5].trim());
}

function responseType(input) {
    if (input[0] != '/') {
        //log error message
        return errorMessage_syntax;
    }
    var cmd = input.substr(1).split(' ');
    switch (cmd[0]) {
        default:
            return 'text';
    }
}

function parseCmd(input, phone, msgObj, callback) {
    if (input[0] != '/') {
        var cmd = input.split(' ');
        if (cmd[0] == 'hello' || cmd[0] == 'hi') {
            return "Hello, " +  auth.getFirstName(phone) + "!";
        }
        //log error message
        return errorMessage_syntax;
    }
    var cmd = input.substr(1).split(' ');

    switch (cmd[0]) {
        //////////////////////////////////////////////MESSAGES
        case 'hello':
            return "Hello, " +  auth.getFirstName(phone) + "!";
        case 'help':
            return helpMessage;
        case 'ogl': 
            if (!auth.isOGL(phone)) {
                return notOGLMessage;
            }
            return oglHelpMessage;     
        //////////////////////////////////////////////AUTH, BROADCASTS
        case 'password':
            var pw = cmd[1];
            return aroundNUS.getTask(pw);
        case 'broadcast':
            if (auth.isLordAlmighty(phone)) {
                if (isNaN(cmd[1])) {
                    return errorMessage_NaN;
                } else {
                    //console.log(cmd[1]);
                    //return broadcaster.broadcast(msg, "ankaa");
                }
            } else {
                return "Hey, you're not allowed back here!";
            }            
        case 'revokeOGL':
            if (!auth.isLordAlmighty(phone)) {
                return "You're not worthy.";
            }
            return admin.revokeOGL(cmd[1]);
        //////////////////////////////////////////////LETTERS 
        case 'addletter':
            if (!auth.isOGL(phone)) {
                return notOGLMessage;
            }
            if (cmd[1].length > 1) {
                return "A letter has ONE CHARACTER";
            } else {
                return dataManip.addLetter(auth.getHouse(phone), cmd[1]);
            }
        case 'letters':
            return dataManip.getLetters(auth.getHouse(phone));
        case 'clearletters':
            return dataManip.clearLetters(auth.getHouse(phone));
        //////////////////////////////////////////////POINTS
        case 'points':
            return dataManip.getPoints(auth.getHouse(phone));
        case 'addpoints':
            if (!auth.isOGL(phone)) {
                return notOGLMessage;
            }
            if (isNaN(cmd[1])) {
                return errorMessage_NaN;
            } else {
                return dataManip.addPoints(auth.getHouse(phone), cmd[1]);
            }
        case 'minuspoints':
        case 'subtractpoints':
            if (!auth.isOGL(phone)) {
                return notOGLMessage;
            }
            if (isNaN(cmd[1])) {
                return errorMessage_NaN;
            } else {
                return dataManip.subtractPoints(auth.getHouse(phone), cmd[1]);
            }
        default:
            return helpMessage;
    }
}

module.exports = {
    'request': request
};

