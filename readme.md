
Matriz Horizontal 4x4

# Validacion de cadenas de ADN

Este software esta construido con las siguientes tecnologias:
- Node JS 16.x
- Jest para las pruebas unitarias
- Serverless para el despliegue a AWS
- AWS lambda
- AWS dynamo DB
- Github actions para el CI/CD mediante PR

## Endpoints disponibles

### Verificar mutacion
    https://97jj7a7x5j.execute-api.us-east-1.amazonaws.com/pruebas/v1/mutation

### Estadisticas
    https://97jj7a7x5j.execute-api.us-east-1.amazonaws.com/pruebas/v1/stats

## Ejemplos para el consumo para la validacion
```js
// matriz sin mutacion
{
    "dna": [
        "ATGCGA",
        "CAGTGC",
        "TTATTT",
        "AGACGG",
        "GCGTCA",
        "TCACTG"
    ]
}

//  mutacion 1
{
    "dna": [
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
    ]
}

// mutacion 2
{
    "dna": [
        "ATGCGA",
        "CAGTGC",
        "TTTTGT",
        "AGAAGG",
        "CCCCTA",
        "TCCCCG"
    ]
}

// mutacion 3
{
    "dna": [
        "ATTTTA",
        "CGGAGC",
        "AATTTT",
        "AGACGG",
        "GTTATA",
        "TCACTG"
    ]
}
```


## Comandos correr las pruebas unitarias
```bash
# instalar las dependencias
npm i

# correr las pruebas
npm test
```

## Comandos para desplegar el proyecto
```bash
# considera que debes tener instalado tus credenciales de AWS en el archivo config:
# [default]
# aws_access_key_id=XXXXXXXXXXXXXXXXXXXX
# aws_secret_access_key=XX/XXXXXXXXXXXXXXXX+XXXXXXXXXXXXXXXXXXXX

# instalar las dependencias
npm i

# correr las pruebas
sls deploy
```