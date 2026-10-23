/*
1. Traer las herramientas express y path
2. Crear la tienda (app) usando express
3. Decirle a la tienda que entregue los archivos de la carpeta public
4. NUEVO: Abrir una ventanilla para la página principal (/):
   cuando alguien pida /, responder con una página de bienvenida
   que tenga un enlace a hello-world.html
5. Abrir la puerta 3000 y avisar en la terminal que la tienda abrió
*/ 

const express = require('express');
const path = require('path');

const app = express();
app.get('/', (request, response) => {
    const html = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome</title>
        </head>
        <body>
            <h1>Welcome to the root!</h1>
            <a href="/hello-world.html">Go to Hello World</a>
        </body>
    </html>`;
    response.status(200).send(html);
});
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});