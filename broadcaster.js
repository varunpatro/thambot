var jf = require("jsonfile");
var app = require("./app");

var studentsInfoFilepath =  './private/students_info.json';
var studentsInfo = jf.readFileSync(studentsInfoFilepath);

var teamADeliveryMsg = "***DELIVERY*** \nYour mission is to deliver a computer virus to the friendly guard " +
					  "in your opponent’s base within 15 minutes. \nThe COMPUTER VIRUS (a large red " +
					  "lightstick) is located on the REGISTRATION COUNTER of the INFINITY POOL. \nThe " +
					  "friendly guard is wearing a lightstick on his/her LEFT wrist, and is walking " +
					  "around the enemy’s base on Level 3 of ERC. \nSuccessful delivery in 15 minutes "+
					  "earns your team 50 points. \nYour time starts now.";

var teamBDeliveryMsg = "team b delivery";

var teamCDeliveryMsg = "team c delivery";

var msgArray = ["this is an oweek test do not panic", teamADeliveryMsg, teamBDeliveryMsg, teamCDeliveryMsg];

function broadcast(msgIndex, housename) {
	var msg = msgArray[msgIndex];
	for (var phone in studentsInfo) {
		if (phone.hasOwnProperty(house) && phone[house] == housename) {
			app.sendMsg(phone, msg);
		}
	}
}

module.exports = {
	broadcast: broadcast
}