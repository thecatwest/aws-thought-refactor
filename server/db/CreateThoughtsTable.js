// import aws-sdk package
const AWS = require('aws-sdk');
// modify AWS config object that DynamoDB will use to connect to local instance located at port 8000
AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
  });

// create DynamoDB service object
// by specifying api version, ensures that API library used is compatible with commands
// important that DynamDB class is used to create service interface object dymamodb
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// create params object that will hold schema and metadata of table
const params = {
    TableName: "Thoughts",
    KeySchema: [ // define partition key and sort key; used username and createdAt to create unique composite key
        { AttributeName: "username", KeyType: "HASH" }, //Partition key
        { AttributeName: "createdAt", KeyType: "RANGE" } //Sort key; one benefit of createdAt as sort key: queries will automatically sort by this value, ordering thoughts from most recent
    ],
    AttributeDefinitions: [ // define the attributes used for hash and range keys; must assign data type to attributes declared
        { AttributeName: "username", AttributeType: "S" }, // designated string datatype
        { AttributeName: "createdAt", AttributeType: "N" } //designated number datatype
    ],
    ProvisionedThroughput: { // setting reserves max write and read capacity of the database, helping to control AWS costs
        ReadCapacityUnits: 10, 
    WriteCapacityUnits: 10
    }
};

// make a call to DynamoDB instance and create the table
dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});