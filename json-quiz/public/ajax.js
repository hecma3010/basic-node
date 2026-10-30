/**
 === PARTE A · LA FUNCIÓN checkAnswer ===

A1. CREAR una función llamada checkAnswer que recibe el evento (event)
A2.     LEER el name del botón que se marcó (event.target.name)
        GUARDARLO en una constante llamada question
A3.     LEER el value del botón que se marcó (event.target.value)
        GUARDARLO en una constante llamada answer
A4.     BUSCAR el output cuyo id es question + "Result"
        GUARDARLO en una constante llamada output
A5.     ESCRIBIR "checking..." dentro de output
A6.     CREAR un objeto con dos propiedades: question y answer
A7.     CONVERTIRLO en texto con JSON.stringify
        CODIFICARLO con encodeURIComponent
        GUARDARLO en una constante llamada strJSON
A8.     CREAR un intercomunicador nuevo (XMLHttpRequest) llamado xhr
A9.     ABRIR xhr con: método GET, dirección "/process-quiz?strJSON=" + strJSON, asíncrono
A10.    CUANDO cambie el estado de xhr:
            SI el estado es DONE Y el código es 200
            ENTONCES ESCRIBIR la respuesta del servidor dentro de output (innerHTML)
A11.    ENVIAR xhr sin cuerpo (null)

=== PARTE B · CONECTAR CON LOS BOTONES ===

B1. BUSCAR todos los botones de opción de la página
B2. PARA CADA botón:
        CUANDO cambie (evento change), EJECUTAR checkAnswer
 */

const checkAnswer = (event) => {
    const question = event.target.name;
    const answer = event.target.value;
    const output = document.getElementById(question + 'Result');
    output.textContent = 'checking...';
    const answerData = {question: question, answer: answer};
    const strJSON = encodeURIComponent(JSON.stringify(answerData));
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/process-quiz?strJSON=' + strJSON, true);
    xhr.onreadystatechange = () =>{
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            output.innerHTML = xhr.responseText;
        }
    };
    xhr.send(null);
};
const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', checkAnswer);
});
