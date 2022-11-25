const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');



aws.config.update({
    accessKeyId: "004dd850cdd33c50000000002",
    secretAccessKey: "K004orUgXKrCePBE7u0CE/XeYlX4zmw"
});


// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('s3.us-west-004.backblazeb2.com');
const s3 = new aws.S3({
    endpoint: spacesEndpoint
});


// Change bucket property to your Space name
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'standares',
        key: function (request, file, cb) {
            console.log(file);
            cb(null, file.originalname);
        }
    })
}).array('upload', 1);


module.exports = {upload}