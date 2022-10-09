const imprimirMatriz = (titulo, matriz) => {
    console.log(`----- ${titulo} -----\n${matriz.join('\n')}`);
};

// validar que la matriz no sea vacia, sea de NxN, tenga almenos 4 caracteres y sea ACGT
const validarEstructuraMatriz = (matriz) => {
    // si la matriz esta vacia o es menor a 4
    if (matriz.length === 0 || matriz.length < 4) {
        return false;
    }

    for (let i = 0; i < matriz.length; i++) {
        if (matriz[i].length === 0 || matriz[i].length !== matriz.length) {
            return false;
        }

        if (!/^[ACGT]+$/i.test(matriz[i])) {
            return false;
        }
    }
    return true;
};

// generar una matriz utilizando las columnas
const generarMatrizVertical = (matriz) => {
    let strings_verticales = [];

    for (let i = 0; i < matriz.length; i++) {
        let nuevo_string = '';
        for (let j = 0; j < matriz[i].length; j++) {
            nuevo_string += matriz[j][i];
        }
        strings_verticales.push(nuevo_string);
    }

    return strings_verticales;
};

// generar una matriz utilizando las diagonales
const generarMatrizOblicuaIzq = (matriz) => {
    let strings_obliquas = [];

    // recorer primera fila
    for (let i = 0; i < matriz.length; i++) {

        let x = 0;
        let y = i;
        let nuevo_string = '';

        for (let j = 0; j < matriz.length; j++) {
            if (matriz[x] && matriz[x][y]) {
                nuevo_string += matriz[x][y];
            }

            x++;
            y++;
        }
        if (nuevo_string.length > 3) {
            strings_obliquas.push(nuevo_string);
        } else {
            break;
        }
    }

    // recorer primera columna
    for (let i = 0; i < matriz.length; i++) {

        // excluimos la primera fila porque se incluyo en el for anterior
        if (i === 0) {
            continue;
        }

        let x = i;
        let y = 0;
        let nuevo_string = '';

        for (let j = 0; j < matriz.length; j++) {
            if (matriz[x] && matriz[x][y]) {
                nuevo_string += matriz[x][y];
            }

            x++;
            y++;
        }

        if (nuevo_string.length > 3) {
            strings_obliquas.push(nuevo_string);
        } else {
            break;
        }
    }

    return strings_obliquas;
};

// valida si una cadena tiene 4 caracteres seguidos
const encontrarMutacionCadena = (cadena,) => {
    if (/AAAA/.test(cadena) || /CCCC/.test(cadena) || /GGGG/.test(cadena) || /TTTT/.test(cadena)) {
        return true;
    }

    return false;
};

// validar el numero de mutaciones en una matriz
const encontrarMutacionMatrizHorizontal = (matriz) => {
    let mutaciones_encontradas = 0;
    for (let i = 0; i < matriz.length; i++) {
        if (encontrarMutacionCadena(matriz[i])) {
            mutaciones_encontradas++;
        }
    }

    return mutaciones_encontradas;
};

const encontrarMutaciones = (matriz) => {
    // 1. buscar horizontalmente
    let mutaciones_encontradas = encontrarMutacionMatrizHorizontal(matriz);
    if (mutaciones_encontradas >= 2) {
        return true;
    }

    console.log('--------------1', mutaciones_encontradas);

    // 2. buscar verticalmente, generando una matriz con las columnas
    let matriz_vertical = generarMatrizVertical(matriz);
    mutaciones_encontradas += encontrarMutacionMatrizHorizontal(matriz_vertical);
    if (mutaciones_encontradas >= 2) {
        return true;
    }

    console.log('--------------2', mutaciones_encontradas);

    // 3. buscar oblicuamente, generando una matriz con las diagonales
    let matriz_oblicua = generarMatrizOblicuaIzq(matriz);
    mutaciones_encontradas += encontrarMutacionMatrizHorizontal(matriz_oblicua);
    if (mutaciones_encontradas >= 2) {
        return true;
    }

    console.log('--------------3', mutaciones_encontradas);

    return false;
};

const calcularRatio = (mutaciones, sin_mutaciones) => {
    if (mutaciones === 0) {
        return 0;
    }
    return +((mutaciones / sin_mutaciones).toFixed(2));
};

module.exports = {
    validarEstructuraMatriz,
    encontrarMutacionCadena,
    encontrarMutacionMatrizHorizontal,
    generarMatrizVertical,
    generarMatrizOblicuaIzq,
    encontrarMutaciones,
    calcularRatio,
}