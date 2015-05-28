var auth = require('./auth');
var util = require('./util');

var invalidUserMessage = "Hi, you're not registered in the Thambot server. Please contact your OGL to register.";

var helpMessage =
    'Here\'s what you can ask Thambot! ' + 
    '\n/points - get your house\'s current points' +
    '\n/password - enter in a password for Around NUS';

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