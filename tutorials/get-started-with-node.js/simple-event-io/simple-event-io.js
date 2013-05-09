var http = require('http');

var options = {
    host: 'http://hustcalm.me',
    port: 80,
    path: '/about',
    method: 'POST'
};

var request = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('UTF8');

    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});

request.on('error', function (e) {
    console.log('problem occured with request: ' + e.message);
});

// Write Data and Test
request.write('data\n');
request.write('data\n');
request.end();
