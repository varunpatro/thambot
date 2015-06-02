var auth = require('./auth');
var util = require('./util');
var aroundNUS = require('./aroundNUS');
var pointSys = require('./pointsystem');

var invalidUserMessage = "Hi, you're not registered in the Thambot server. Please contact your OGL to register.";

var helpMessage =
    'Here\'s what you can ask Thambot! ' + 
    '\nType /points to get your house\'s current points.' +
    '\nType /password [PASSWORD] to enter in a password for an AroundNUS station.' + 
    "\nType /ogl if you are an OGL for special OGL commands.";

var errorMessage_syntax =
    'Thambot didn\'t understand that command. Thambot is confused! Type \'/help\' for more' +
    ' information.';
var errorMessage_NaN = 
    "That's not a number Thambot knows how to add or subtract :( \n Numbers look like this: 1, 2, 3, 34583489"; 

var oglHelpMessage = 
    'Type /addpoints [number] to add points.';

function request(msgObj, callback) { //msg object. Returns a msgObj
    var msgFrom = util.getPhoneNum(msgObj.from);
    var msgRequest = msgObj.body;
    var msgType = '';
    var msgResponse = '';

    if (!auth.isAllowed(msgFrom)) {
        msgResponse = invalidUserMessage;
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
        if (cmd[0] == 'uk') {
            return '##1f1ec_1f1e7##';
        }
        //log error message
        return errorMessage_syntax;
    }
    var cmd = input.substr(1).split(' ');

    switch (cmd[0]) {
        case 'hello':
            return "Hello, " +  auth.getFirstName(phone) + "!";
        case 'help':
            return helpMessage;
        case 'password':
            var pw = cmd[1];
            return aroundNUS.getTask(pw);
        case 'points':
            return pointSys.getPoints(auth.getHouse(phone));
        case 'ogl': 
            return oglHelpMessage;
        case 'addpoints':
            if (isNaN(cmd[1])) {
                return errorMessage_NaN;
            } else {
                return pointSys.updateHousePoints(auth.getHouse(phone), cmd[1]);
            }
        default:
            return helpMessage;
    }
}

module.exports = {
    'request': request
};

