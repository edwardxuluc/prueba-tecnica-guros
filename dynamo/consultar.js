const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = async (dna_string) => {
    const params = {
        TableName: process.env.TABLA_DYNAMODB,
    };

    if( dna_string ){
        params.FilterExpression = 'dna_string = :dna_string';
        params.ExpressionAttributeValues = {
            ':dna_string': dna_string
        };
    }

    let scanResults = [];
    let items;

    do {
        items = await dynamoDB.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (items.LastEvaluatedKey);

    return scanResults;
};