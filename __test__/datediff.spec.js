
const parseUserInput = require('../datediff').parseUserInput;
const dateDiff = require('../datediff').dateDiff;


describe("Input data validation", function() {

  it("Input dates should be two dates", function() {
  	var input = '2 3 1999, 2 11 2008, 1 1 1980';
  	expect(parseUserInput(input).validationMessage[0]).toBe('Must be two dates in format "DD MM YYYY, DD MM YYYY".');
  	expect(parseUserInput(input).validationMessage.length).toBe(1);
  });

  it("Day, month, year should be number", function() {
  	var input = '12 8a 1999, +2 1.1 2008';  	
  	expect(parseUserInput(input).validationMessage[1]).toBe('Date 2 error: Day of date 2 must be a number.');
  	expect(parseUserInput(input).validationMessage.length).toBe(3);
  });  

  it("29/02/1999 should be invalid", function() {
  	var input = '29 02 1999, 29 02 2000';  	
  	expect(parseUserInput(input).validationMessage[0]).toBe('Date 1 error: Day should be between 1 and 28.');
  	expect(parseUserInput(input).validationMessage.length).toBe(1);
  });  

  it("29/02/2000(leapyear) should be valid", function() {
  	var input = '28 02 1999, 29 02 2000';  	
  	expect(parseUserInput(input).validationMessage.length).toBe(0);
  });  

});


describe("Date Diffrence", function() {

	it('Diff between same date should be 0 days', function() {
		var date1 = { day:16, month:12, year:1999 };
		var date2 = { day:16, month:12, year:1999 };
		expect(dateDiff(date1, date2)[2]).toBe(0);
	});

	it('Diff between 03/02/1900 and 01/03/2000 should be 36551 days', function() {
		var date1 = { day:3, month:2, year:1900 };
		var date2 = { day:1, month:3, year:2000 };
		expect(dateDiff(date1, date2)[2]).toBe(36551);
	});

	it('The first date of Diff result should be the earliest, the second date should be the latest', function() {
		var date1 = { day:23, month:11, year:1982 };
		var date2 = { day:28, month:2, year:1903 };
		expect(dateDiff(date1, date2)[0]).toBe('28 2 1903');
		expect(dateDiff(date1, date2)[1]).toBe('23 11 1982');		
	});

});

