// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  console.log("hello");
  res.json({greeting: 'hello API'});
});

app.get('/api/:year-:month-:date', (req, res) => {
    let { year, month, date } = req.params;
    
    let formattedDate = new Date(`${year}-${month}-${date}`);
    
    if (isNaN(formattedDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    res.json({
        unix: formattedDate.getTime(),
        utc: formattedDate.toUTCString()
    });
});

app.get('/api/:timestamp', (req, res) => {
    let unixTimestamp = parseInt(req.params.timestamp);
    
    if (isNaN(unixTimestamp)) {
        return res.status(400).json({ error: 'Invalid timestamp' });
    }

    let date = new Date(unixTimestamp);
    res.json({
        unix: unixTimestamp,
        utc: date.toUTCString()
    });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
