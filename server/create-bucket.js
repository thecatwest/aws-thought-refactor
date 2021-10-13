// package responsible for the API that allows app to communicate with web service
const AWS = require('aws-sdk');
// import uuid package to create unique S3 bucket name 
const { v4: uuidv4 } = require('uuid');
// statement to config the region
AWS.config.update({region: 'us-east-2'});
// create S3 service instance object with designated API
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
// create bucketParams object that assigns metadata of the bucket (for calling createBucket)
var bucketParams = {
    Bucket : "user-images-" + uuidv4()
};

// call S3 to create the bucket
// use callback fn with the createBucket method and bucketParams object to create an S3 bucket
s3.createBucket(bucketParams, (err, data) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success");
    }
});