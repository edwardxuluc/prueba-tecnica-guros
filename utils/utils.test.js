const { validarEstructuraMatriz, encontrarMutacionCadena, encontrarMutacionMatrizHorizontal, generarMatrizVertical, generarMatrizOblicuaIzq, encontrarMutaciones, calcularRatio } = require('./utils');

test('Validar matriz | matriz vacia', () => {
    let matriz = [
    ];
    expect(validarEstructuraMatriz(matriz)).toBe(false);
});

test('Validar matriz | matriz 3x3', () => {
    let matriz = [
        'ATG',
        'CAG',
        'TTA',
    ];
    expect(validarEstructuraMatriz(matriz)).toBe(false);
});

test('Validar matriz | matriz NxM', () => {
    let matriz = [
        'ATGCGA',
        'CAGTGC',
    ];
    expect(validarEstructuraMatriz(matriz)).toBe(false);
});

test('Validar matriz | NxN', () => {
    let matriz = [
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTG',
    ];
    expect(validarEstructuraMatriz(matriz)).toBe(true);
});

test('Validar matriz | caracteres validos(ACGT)', () => {
    let matriz = [
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTG',
    ];
    expect(validarEstructuraMatriz(matriz)).toBe(true);
});

test('Validar matriz | caracteres no validos(ACGTR)', () => {
    let matriz = [
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTR',
    ];
    expect(validarEstructuraMatriz(matriz)).toBe(false);
});


test('Generar matriz vertical | 4X4', () => {
    let matriz = [
        'ACGT',
        'ACGT',
        'ACGT',
        'ACGT',
    ];
    expect(generarMatrizVertical(matriz)).toEqual([
        'AAAA',
        'CCCC',
        'GGGG',
        'TTTT',
    ]);
});

test('Generar matriz vertical | 8X8', () => {
    let matriz = [
        'AACCGGTT',
        'AACCGGTT',
        'AACCGGTT',
        'AACCGGTT',
        'AACCGGTT',
        'AACCGGTT',
        'AACCGGTT',
        'AACCGGTT',
    ];
    expect(generarMatrizVertical(matriz)).toEqual([
        'AAAAAAAA',
        'AAAAAAAA',
        'CCCCCCCC',
        'CCCCCCCC',
        'GGGGGGGG',
        'GGGGGGGG',
        'TTTTTTTT',
        'TTTTTTTT',
    ]);
});


test('Generar matriz obliqua | izq-der | 4X4 ', () => {
    let matriz = [
        'ACGT',
        'ACGT',
        'ACGT',
        'ACGT',
    ];
    expect(generarMatrizOblicuaIzq(matriz)).toEqual([
        'ACGT'
    ]);
});

test('Generar matriz obliqua | izq-der | 8x8 ', () => {
    let matriz = [
        'AACCGGTT',
        'AACCGGTT',
        'AACCGGTT',
        'AACCGGTT',
        'AACCGGTT',
        'AACCGGTT',
        'AACCGGTT',
        'AACCGGTT',
    ];
    expect(generarMatrizOblicuaIzq(matriz)).toEqual([
        'AACCGGTT',
        'ACCGGTT',
        'CCGGTT',
        'CGGTT',
        'GGTT',
        'AACCGGT',
        'AACCGG',
        'AACCG',
        'AACC',
    ]);
});


test('Validar cadena ADN | con caracteres 4 consecutivos', () => {
    let cadena = 'AAAAGA';
    expect(encontrarMutacionCadena(cadena)).toBe(true);
});

test('Validar cadena ADN | con caracteres 4 consecutivos', () => {
    let cadena = 'AGAAAA';
    expect(encontrarMutacionCadena(cadena)).toBe(true);
});

test('Validar cadena ADN | sin caracteres 4 consecutivos', () => {
    let cadena = 'AATAGA';
    expect(encontrarMutacionCadena(cadena)).toBe(false);
});

test('Validar cadena ADN | sin caracteres 4 consecutivos', () => {
    let cadena = 'AGAAAT';
    expect(encontrarMutacionCadena(cadena)).toBe(false);
});


test('Funcion para contar las mutaciones en una matriz | 0', () => {
    let cadena = [
        'AGAAAT',
        'AGAATT',
        'AGAATA',
        'AGAGAT',
        'AGGGAT',
        'AAGAGT',
    ]
    expect(encontrarMutacionMatrizHorizontal(cadena)).toBe(0);
});

test('Funcion para contar las mutaciones en una matriz | 4', () => {
    let cadena = [
        "ATTTTA",
        "CCCCTA",
        "ATGGGG",
        "AGACGG",
        "GGAAAA",
        "TCACTG"
    ]
    expect(encontrarMutacionMatrizHorizontal(cadena)).toBe(4);
});

test('Funcion para contar las mutaciones en una matriz | 2', () => {
    let cadena = [
        "ATTTTA",
        "CGGAGC",
        "AATTTT",
        "AGACGG",
        "GTTATA",
        "TCACTG"
    ]
    expect(encontrarMutacionMatrizHorizontal(cadena)).toBe(2);
});

test('Encontrar todas las mutaciones en una matriz', () => {
    let matriz = [
        "ATGCGA",
        "CAGTGC",
        "TTATTT",
        "AGACGG",
        "GCGTCA",
        "TCACTG"
    ];

    expect(encontrarMutaciones(matriz)).toBe(false);
});

test('Calcular Ratio', () => {
    expect(calcularRatio(2, 100)).toBe(0.02);
});

test('Calcular Ratio', () => {
    expect(calcularRatio(40, 100)).toBe(0.4);
});