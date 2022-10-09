'use strict';
const consultar = require('../dynamo/consultar');
const { calcularRatio } = require('../utils/utils');
const headers = {
    "Access-Control-Allow-Origin": "*"
};

module.exports.handler = async event => {
    try {

        let req = event.headers ? JSON.parse(event.body) : event;
        let resultados = await consultar();
        let count_con_mutaciones = 0;
        let count_sin_mutaciones = 0;

        resultados.forEach(resultado => {
            if (resultado.mutacion) {
                count_con_mutaciones++;
            } else {
                count_sin_mutaciones++;
            }
        });

        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify({
                count_mutations: count_con_mutaciones,
                count_no_mutation: count_sin_mutaciones,
                ratio: calcularRatio(count_con_mutaciones, count_sin_mutaciones),
            }),
        };
    } catch (err) {
        console.log('Mensaje de error: ' + err.message);
        return {
            headers: headers,
            statusCode: 500,
            body: JSON.stringify({
                message: `Ha ocurrido un error al validar la cadena de ADN: ${err.message}`
            }),
        }
    }
};
