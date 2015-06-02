var auth = require('./auth');
var util = require('./util');
var aroundNUS = require('./aroundNUS');
var pointsys = require('./pointsystem');

var invalidUserMessage = "Hi, you're not registered in the Thambot server. Please contact your OGL to register.";

var helpMessage =
    'Here\'s what you can ask Thambot! ' + 
    '\nType /points to get your house\'s current points.' +
    '\nType /password [PASSWORD] to enter in a password for an AroundNUS station.' + 
    "\nType /ogl if you are an OGL for special OGL commands.";

var syntaxErrorMessage =
    'Thambot didn\'t understand that command. Thambot is confused! Type \'/help\' for more' +
    ' information.';

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
        return syntaxErrorMessage;
    }
    var cmd = input.substr(1).split(' ');
    switch (cmd[0]) {

        default:
            return 'text';
    }
}

function parseCmd(input, phone, msgObj, callback) {
    if (input[0] != '/') {
        //log error message
        return syntaxErrorMessage;
    }
    var cmd = input.substr(1).split(' ');

    switch (cmd[0]) {
        case 'help':
            return helpMessage;
        case 'password':
            var pw = cmd[1];
            return aroundNUS.getTask(pw);
        case 'points':
            console.log(phone);
            return pointsys.getPoints(auth.getHouse(phone));
        default:
            return helpMessage;
    }
}

module.exports = {
    'request': request
};

