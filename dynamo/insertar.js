const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const crypto = require('crypto');
const generateUUID = () => crypto.randomBytes(16).toString('hex');

module.exports = async (data) => {

    data.id = generateUUID();
    data.created_at = new Date().toLocaleString("es-ES", {timeZone: "America/Mexico_City"});

    const params = {
        TableName: process.env.TABLA_DYNAMODB,
        Item: data
    };
    return await new Promise((resolve, reject) => {
        dynamoDB.put(params, (error) => {
            if (error) {
                console.log('Error al insertar' + JSON.stringify(error));
                return reject(error);
            }
            return resolve(params.Item);
        });
    });
};