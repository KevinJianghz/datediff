
const parseUserInput = require('./datediff').parseUserInput;
const dateDiff = require('./datediff').dateDiff;

process.stdin.resume();
process.stdin.setEncoding('utf8');

console.log('\nPlease enter two dates:\n');
process.stdin.on('data', function (chunk) {
	var myDates, diffResult;

	myDates = parseUserInput(chunk);
	if(myDates.validationMessage.length > 0) {
		console.log('\n');	
		console.log(myDates.validationMessage.join('\n'));
		console.log('\n');		
	}
	else {
		diffResult = dateDiff(myDates.dates[0], myDates.dates[1]);
		console.log(diffResult.join(', ') + '\n');
	}

	process.exit();
});