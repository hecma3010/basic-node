/*// --- ZONA 1: Importación de módulos ---
CARGAR el módulo http
CARGAR el módulo fs
CARGAR el módulo path

// --- ZONA 2: Servidor y variables por petición ---
CREAR el servidor con http.createServer, con una función flecha que recibe request y response
    DECLARAR status con valor 200
    DECLARAR title, content e img sin valor

    // --- ZONA 3: Enrutador ---
    SEGÚN request.url:
        '/'            → title = 'Home'; content = el HTML de bienvenida
        '/contact'     → title = 'Contact'; content = el HTML de contacto, con un nombre con tilde y ñ
        '/favicon.ico' → img = leer el archivo con fs.readFileSync,
                         construyendo la ruta con path.join(__dirname, 'favicon.ico')
        cualquier otra → status = 404; title = 'Not Found'; content = el HTML de error con enlace a /

    // --- ZONA 4: Despacho ---
    SI (typeof img es estrictamente igual a 'undefined') ENTONCES:
        // Rama A: se pidió una página
        CREAR la constante html con un literal de plantilla:
            - en <title>, la variable title
            - en <body>, la variable content
        LLAMAR a response.writeHead con:
            - primer argumento: status
            - segundo argumento: { 'Content-Type': 'text/html; charset=UTF-8' }
        LLAMAR a response.end con html

    SI NO:
        // Rama B: se pidió el ícono
        LLAMAR a response.writeHead con:
            - primer argumento: status
            - segundo argumento: { 'Content-Type': 'image/x-icon' }
        LLAMAR a response.end con img

    REGISTRAR request.url en la terminal con console.log
FIN del servidor

// --- ZONA 5: Encendido ---
LLAMAR a server.listen con:
    - el puerto 3000
    - una función flecha sin parámetros que imprime en la terminal que el servidor está corriendo
*/

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    let status = 200;
    let title;
    let content;
    let img;

    switch(request.url){
        case '/':
            title = 'Home';
            content = '<h1>Welcome to the home page!</h1>';
            break;
        case '/contact':
            title = 'Contact';
            content = '<h1>Contact Us</h1><p>Reach out to us at example@email.com or ask for José Muñoz.</p>';
            break;
        case '/favicon.ico':
            img = fs.readFileSync(path.join(__dirname, 'favicon.ico'));
            break;
        default:
            status = 404;
            title = 'Not Found';
            content = 
            `<h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/">Go back to Home</a>`;
            break;
    }
    if (typeof img === 'undefined') {
        const html = `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>${title}</title>
            </head>
            <body>
                ${content}
            </body>
        </html>`;
        response.writeHead(status, { 'Content-Type': 'text/html; charset=UTF-8' });
        response.end(html);
    } else {
        response.writeHead(status, { 'Content-Type': 'image/x-icon' });
        response.end(img);
    }
    console.log(request.url);
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});