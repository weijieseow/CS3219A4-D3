// Declare variables
var fs = require('fs'), obj;

// Read the file and send to the callback
fs.readFile('./log.json', handleFile);

// Write the callback function
function handleFile(err, data) {
	if (err) throw err;

	jsonObj = JSON.parse(data);

	var infoArray = [];
	var numDaysJan = 31;

	for (var i = 0; i < numDaysJan; i++) {
		infoArray.push({
                        day : i + 1,    //which day of the month
                        am : 0,         //number of commits by programmer name A - M
                        nz : 0         //number of commits by programmer name N - Z
                    }); // initialise each day to 0 
	}

	jsonObj.forEach(function(commit) {
		var date = commit.date;	// e.g Mon Jun 13 16:21:02 2016 -0400

		if (date.slice(20, 24) == "2016") { // in year 2016

			if (date.slice(4, 7) == "Jan") { // in january

				var name = commit.author;
				var day = date.slice(8, 10);

				if (name.slice(0, 1).toUpperCase() <= "M") {
					infoArray[day - 1].am++;
				}
				else {
					infoArray[day - 1].nz++;
				}
			}
		}
	});

	var csv = convertArrayOfObjectsToCSV({
		data: infoArray
	});

	fs.writeFile('commitsData.csv', csv, 'utf8', function (err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
}

function convertArrayOfObjectsToCSV(args) {  
	var result, ctr, keys, columnDelimiter, lineDelimiter, data;

	data = args.data || null;
	if (data == null || !data.length) {
		return null;
	}

	columnDelimiter = args.columnDelimiter || ',';
	lineDelimiter = args.lineDelimiter || '\n';

	keys = Object.keys(data[0]);

	result = '';
	result += keys.join(columnDelimiter);
	result += lineDelimiter;

	data.forEach(function(item) {
		ctr = 0;
		keys.forEach(function(key) {
			if (ctr > 0) result += columnDelimiter;

			result += item[key];
			ctr++;
		});
		result += lineDelimiter;
	});

	return result;
}