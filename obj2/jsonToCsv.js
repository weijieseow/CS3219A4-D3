'use strict';
var https = require('https');
var fs = require('fs');

//q15
var obj2 = {
    host: 'api.github.com',
    path: '/repos/tungnk1993/scrapy/stats/code_frequency',
    headers: {'User-Agent': 'request'}
};

https.get(obj2, function (res) {
    var json = '';
    res.on('data', function (chunk) {
        json += chunk;
    });
    res.on('end', function () {
        if (res.statusCode === 200) {
            try {
                var data = JSON.parse(json);
                    // data is available here:

                    var monthlyInfo = [ 
                    {
                        label : "Jan-16",
                        addition : 0,
                        deletion: 0
                    },
                    {
                        label : "Feb-16",
                        addition : 0,
                        deletion: 0 
                    },
                    {
                        label : "Mar-16",
                        addition : 0,
                        deletion: 0
                    },
                    {
                        label : "Apr-16",
                        addition : 0,
                        deletion : 0
                    },
                    {
                        label : "May-16",
                        addition : 0,
                        deletion: 0
                    },
                    {
                        label : "Jun-16",
                        addition : 0,
                        deletion: 0
                    }
                    ];

                    console.log(monthlyInfo);


                    for (var i = 0; i < data.length; i++) {

                        	//console.log(data[i][0]);
                            if (1451606400 <= data[i][0] && data[i][0] <= 1454284799) { // jan
                                monthlyInfo[0].addition += data[i][1];
                                monthlyInfo[0].deletion += (-1 *data[i][2]);
                            }
                            else if (1454284800 <= data[i][0] && data[i][0] <= 1456703999) { // feb
                                monthlyInfo[1].addition += data[i][1];
                                monthlyInfo[1].deletion += (-1 *data[i][2]);
                            }
                            else if (1456790400 <= data[i][0] && data[i][0] <= 1459468799) { // mar
                                monthlyInfo[2].addition += data[i][1];
                                monthlyInfo[2].deletion += (-1 *data[i][2]);
                            }
                            else if (1459468800 <= data[i][0] && data[i][0] <= 1462060799) { // april
                                monthlyInfo[3].addition += data[i][1];
                                monthlyInfo[3].deletion += (-1 *data[i][2]);
                            }
                            else if (1462060800 <= data[i][0] && data[i][0] <= 1464739199) { // may
                                monthlyInfo[4].addition += data[i][1];
                                monthlyInfo[4].deletion += (-1 *data[i][2]);
                            }
                        	else if (1464739200 <= data[i][0] && data[i][0] <= 1467331199) { // june

                        		monthlyInfo[5].addition += data[i][1];
                        		monthlyInfo[5].deletion += (-1 *data[i][2]);
                        	}
                        }

                        console.log(monthlyInfo);

                        var csv = convertArrayOfObjectsToCSV({
                            data: monthlyInfo
                        });

                        fs.writeFile('data.csv', csv, 'utf8', function (err) {
                            if (err) {
                                console.log('Some error occured - file either not saved or corrupted file saved.');
                            } else {
                                console.log('It\'s saved!');
                            }
                        });
                        

                        //console.log(data);
                    } catch (e) {
                        console.log('Error parsing JSON!');
                    }
                } else {
                    console.log('Status:', res.statusCode);
                }
            });
}).on('error', function (err) {
    console.log('Error:', err);
});

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