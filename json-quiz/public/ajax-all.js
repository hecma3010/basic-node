/**
=== PARTE A · LA FUNCIÓN checkQuiz ===

A1. CREAR una función llamada checkQuiz que recibe el evento (event)
A2.     CANCELAR el envío normal del formulario (preventDefault)
A3.     CREAR un array vacío llamado answers
A4.     PARA CADA pregunta, de q1 a q3:
            BUSCAR el botón de opción marcado de esa pregunta
            SI existe, AGREGAR su value a answers
            SI NO, AGREGAR "x"
A5.     CREAR un objeto con la propiedad answers
A6.     CREAR un intercomunicador nuevo (XMLHttpRequest) llamado xhr
A7.     ABRIR xhr con: método POST, dirección /process-all, asíncrono
A8.     PONERLE la etiqueta Content-Type: application/json
A9.     CUANDO cambie el estado de xhr:
            SI el estado es DONE Y el código es 200
            ENTONCES:
                CONVERTIR la respuesta en objeto con JSON.parse
                GUARDARLA en una constante llamada results
                ESCRIBIR results.q1 en q1Result, results.q2 en q2Result
                y results.q3 en q3Result (innerHTML)
A10.    ENVIAR xhr con el objeto convertido en texto (JSON.stringify)

=== PARTE B · CONECTAR CON EL FORMULARIO ===

B1. BUSCAR el formulario con id "quiz-form"
B2. CUANDO se envíe (evento submit), EJECUTAR checkQuiz
 */

const checkQuiz = (event) => {
    event.preventDefault();
    const questions = ['q1', 'q2', 'q3'];
    const answers = [];
    questions.forEach(question => {
        const checked = document.querySelector(`input[name="${question}"]:checked`);
        if (checked) {
            answers.push(checked.value);
        } else {
            answers.push('x');
        }
    });
    const answerData = {answers};
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/process-all', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const results = JSON.parse(xhr.responseText);
            document.getElementById('q1Result').innerHTML = results.q1;
            document.getElementById('q2Result').innerHTML = results.q2;
            document.getElementById('q3Result').innerHTML = results.q3;
        }
    };
    xhr.send(JSON.stringify(answerData));
};
const form = document.getElementById('quiz-form');
form.addEventListener('submit', checkQuiz);