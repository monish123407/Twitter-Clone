const AWS=require('aws-sdk');
const S3= require('aws-sdk/clients/s3');
const fs = require('fs');
require('dotenv').config();



const bucketName = process.env.AWS_BUCKET_NAME;
// const region = process.env.AWS_BUCKET_REGION;
const accessKeyId=process.env.AWS_ACCESS_KEY;
const secretAccessKey= process.env.AWS_SECRET_KEY;

AWS.config.update({
    accessKeyId,
    secretAccessKey
});
var s3 = new AWS.S3();

const uploadFile = function(file){
    const fileStream = fs.createReadStream(file.path);
    const uploadParams={
        Bucket : bucketName,
        Body:fileStream,
        Key: file.filename
    };

    return s3.upload(uploadParams).promise();
}
const getFile = function(key) {
    const params = {
        Key: key,
        Bucket: bucketName
    };
    return s3.getObject(params).createReadStream();
}

module.exports = {uploadFile, getFile};