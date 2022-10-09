'use strict';
const { validarEstructuraMatriz, encontrarMutaciones } = require('../utils/utils');
const insertarDynamo = require('../dynamo/insertar');
const consultar = require('../dynamo/consultar');
const headers = {
    "Access-Control-Allow-Origin": "*"
};

module.exports.handler = async event => {
    try {

        let req = event.headers ? JSON.parse(event.body) : event;
        let matriz_dna = req.dna;

        if (!validarEstructuraMatriz(matriz_dna)) {
            return {
                statusCode: 400,
                headers: headers,
                body: JSON.stringify({
                    message: 'La matriz no es valida',
                }),
            };
        }

        // validar si la cadena ya se ha analizado
        if( process.env.CONSULTAR_GUARDADOS == 1 ){

            let resultado_guardado = await consultar(matriz_dna.join('|'));

            if (resultado_guardado.length > 0) {
                let mutacion = resultado_guardado[0].mutacion;
                return {
                    statusCode: mutacion ? 200 : 403,
                    headers: headers,
                    body: JSON.stringify({
                        status: mutacion ? 200 : 403,
                    }),
                };
            }
        }

        let mutacion_encontrada = encontrarMutaciones(matriz_dna);

        // guardar en dynamo
        await insertarDynamo({
            dna: req.dna,
            dna_string: matriz_dna.join('|'),
            mutacion: mutacion_encontrada,
        });

        // retornar el resultado de la evaluacion
        return {
            statusCode: mutacion_encontrada ? 200 : 403,
            headers: headers,
            body: JSON.stringify({
                status: mutacion_encontrada ? 200 : 403,
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
