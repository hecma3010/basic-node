/**
 === PARTE A · LA TIENDA ===

 A1. TRAER las herramientas express y path
 A2. CREAR la tienda (app)
 A3. CREAR un objeto constante llamado answerKey con las respuestas correctas:
         q1 → "2"    q2 → "3"    q3 → "1"
 A4. DECIR a la tienda que entregue los archivos de la carpeta public
 
 === PARTE B · LA VENTANILLA DEL CUESTIONARIO ===
 
 B1. ABRIR una ventanilla GET para /process-quiz
 B2.     LEER el parámetro strJSON de request.query
 B3.     CONVERTIR strJSON en un objeto con JSON.parse
         GUARDARLO en una constante llamada answerData
 B4.     BUSCAR en answerKey la respuesta correcta de answerData.question
 B5.     SI la respuesta del usuario (answerData.answer) es igual a la correcta
             RESPONDER con '<span class="right">Right</span>'
         SI NO
             RESPONDER con '<span class="wrong">Wrong</span>'
 
 === PARTE C · LA PUERTA ===
 
 C1. ABRIR la puerta 3000 y avisar en la terminal
 */

const PORT = 3000;
const express = require('express');
const path = require('path');
const app = express();
const answerKey = {q1: '2', q2: '3', q3: '1'};
app.use(express.static(path.join(__dirname, 'public')));

app.get('/process-quiz', (request, response) => {
    const strJSON = request.query.strJSON;
    const answerData = JSON.parse(strJSON);
    const correctAnswer = answerKey[answerData.question];
    if (answerData.answer === correctAnswer){
        response.send(`<span class="right">Right</span>`);
    } else {
        response.send(`<span class="wrong">Wrong</span>`);
    }
    console.log(answerData)
});


/**
=== PARTE A · EL ABRIDOR DE SOBRES JSON ===

A1. DECIR a la tienda que use express.json(),
    para abrir los sobres que traen JSON en el cuerpo

=== PARTE B · LA VENTANILLA DE TODAS LAS RESPUESTAS ===

B1. ABRIR una ventanilla POST para /process-all
B2.     LEER el array answers de request.body
        (ya llega como objeto: express.json() hizo el JSON.parse)
B3.     CREAR un objeto vacío llamado results
B4.     PARA CADA pregunta, de q1 a q3 (posiciones 0 a 2 del array):
            SI la respuesta es "x"
                GUARDAR en results '<span class="unanswered">Unanswered</span>'
            SI NO, SI la respuesta es igual a la de answerKey
                GUARDAR '<span class="right">Right</span>'
            SI NO
                GUARDAR '<span class="wrong">Wrong</span>'
B5.     RESPONDER con results usando response.json
 */

app.use(express.json());
app.post('/process-all', (request, response) => {
    const answers = request.body.answers;
    const results = {};
    answers.forEach((answer, index) => {
        const question = 'q' + (index + 1);
        if (answer === 'x') {
            results[question] = `<span class="unanswered">Unanswered</span>`;
        } else if (answer === answerKey[question]) {
            results[question] = `<span class="right">Right</span>`;
        } else {
            results[question] = `<span class="wrong">Wrong</span>`;
        }
    });
    response.json(results);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});