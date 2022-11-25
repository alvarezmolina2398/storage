const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');



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


module.exports = {upload}