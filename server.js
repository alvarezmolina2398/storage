// Load dependencies
const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');

const app = express();

// Use our env vars for setting credentials. 
// Remove lines 11-14 if using ~/.aws/credentials file on a local server.
aws.config.update({
    accessKeyId: "DO006KY8CC43EFRZF8TQ",
    secretAccessKey: "JWOrKH1Ix+Pk5cAnycON43lH/R6wUC9rr/DfTKOAwpo"
});

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

// Change bucket property to your Space name
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'localsotarestandares',
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    }
  })
}).array('upload', 1);

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
  upload(request, response, function (error) {
    if (error) {
      console.log(error);
      return response.redirect("/error");
    }
    console.log('File uploaded successfully.');
    response.redirect("/success");
  });
});

app.listen(3000, function () {
  console.log('Server listening on port 3000.');
});