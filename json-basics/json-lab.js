/**
=== PARTE A · LOS DATOS ===

A1. CREAR un array constante llamado bands con DOS objetos
    Cada objeto tiene:
        - name: el nombre de una banda (texto)
        - yearFormed: el año de formación (número)
        - members: un array con cuatro nombres (textos)
=== PARTE B · LEER RUTAS ANIDADAS ===

    B1. IMPRIMIR el name de la segunda banda
    B2. IMPRIMIR el primer miembro de la primera banda
    B3. IMPRIMIR el último miembro de la segunda banda,
        usando la longitud de su array members (sin escribir el número 3)

=== PARTE C · DE OBJETO A TEXTO ===

    C1. CONVERTIR bands en un texto JSON con JSON.stringify
        GUARDARLO en una constante llamada bandsText
    C2. IMPRIMIR bandsText
    C3. IMPRIMIR el tipo de bandsText con typeof

=== PARTE D · DE TEXTO A OBJETO ===

    D1. CONVERTIR bandsText en datos con JSON.parse
        GUARDARLOS en una constante llamada bandsCopy
    D2. IMPRIMIR el name de la primera banda de bandsCopy
    D3. IMPRIMIR el tipo de bandsCopy con typeof

=== PARTE E · JSON INVÁLIDO ===

    E1. CREAR una constante llamada badText con un texto que use
        comillas SIMPLES en la clave: {'name': 'Test'}
    E2. INTENTAR (try) convertirlo con JSON.parse e imprimir el resultado
        SI falla (catch):
            IMPRIMIR "Invalid JSON:" seguido del mensaje del error
 */

const bands = [
    {
        name: 'Falling In Reverse',
        yearFormed: 2008,
        members: ['Ronnie Radke', 'Luke Holland', 'Tyler Burgess', 'Derek Jones', 'Mika Horiuchi', 'Jacky Vincent']
    }, 
    {
        name: 'Linkin Park', 
        yearFormed: 1996, 
        members: ['Chester Bennington †', 'Mike Shinoda', 'Emily Armstrong', 'Rob Bourdon', 'Joe Hahn', 'Brad Delson']
    }
];

console.log(bands[1].name);
console.log(bands[0].members[0]);
console.log(bands[1].members[bands[1].members.length - 1]);

const bandsText = JSON.stringify(bands);
console.log(bandsText);
console.log(typeof bandsText); //stringify converts the array into a string

const bandsCopy = JSON.parse(bandsText);
console.log(bandsCopy[0].name);
console.log(typeof bandsCopy); // parse converts the text to an array and typeof says object because arrays are objects

const badText = "{'name': 'Test'}"; // badText is a string because the argument is between ""
try {
    console.log(JSON.parse(badText));
} catch (error) {
    console.log('Invalid JSON:', error.message);
}