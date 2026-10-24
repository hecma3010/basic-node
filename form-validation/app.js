/*
1. Traer las herramientas: express, path, y del kit del inspector, body y validationResult
2. Crear la tienda (app) usando express
3. Decirle a la tienda que entregue los archivos de la carpeta public
4. NUEVO: Poner al empleado que abre los sobres de los formularios
5. Abrir una ventanilla para la página principal (/):
   mandar al visitante al formulario /ice-cream.html
6. NUEVO: Abrir la ventanilla del inspector para /process:
   a. Revisar cada campo con su regla
   b. Si no hay errores, mandar al visitante a /success.html
   c. Si hay errores, responder con la lista de errores y el código 400
7. Abrir la puerta 3000 y avisar en la terminal que la tienda abrió
*/

const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');
const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    response.redirect('/ice-cream.html');
});
app.post('/process', [
    body('username').trim().isLength({ min: 8, max: 25 }).withMessage('Username must be between 8 and 25 characters'),
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    body('phone').matches(phoneRegex).withMessage('Phone must use the format 555-555-5555'),
    body('flavor').not().equals('0').withMessage('Please choose a flavor'),
    body('container').exists().withMessage('Please choose a container'),
    body('terms').exists().withMessage('You must accept the terms')
],
    (request, response) => {
        const errors = validationResult(request);
        if (errors.isEmpty()) {
            response.redirect('/success.html');
        } else {
            let errorList = '';
            for (const error of errors.array()) {
                errorList += `<li>${error.msg}</li>`;
            }
            const html = `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Form errors</title>
                </head>
                <body>
                    <main>
                        <h1>Please fix these errors</h1>
                        <ul>${errorList}</ul>
                        <a href="/ice-cream.html">Go back to the form</a>
                    </main>
                </body>
            </html>`;
            response.status(400).send(html);
        }
    });

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});