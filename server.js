// Load dependencies
const express = require('express');
const digitalOcean = require('./digitalOcean')
const blackBlaze = require('./blackBlaze')
const app = express();

// Views in public directory
app.use(express.static('public'));

// Main, error and success views
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

app.get("/success", function (request, response) {
    response.sendFile(__dirname + '/public/success.html');
});

app.get("/error", function (request, response) {
    response.sendFile(__dirname + '/public/error.html');
});

app.post('/upload', function (request, response, next) {


    
     digitalOcean.upload(request, response, function (error) {
        if (error) {
            console.log(error);
          //  return response.send("error");
        }
    });


    blackBlaze.upload(request, response, function (error) {
        if (error) {
            console.log(error);
           // return response.send("error");
        }
    });


    
});




app.listen(3000, function () {
    console.log('Server listening on port 3000.');
});