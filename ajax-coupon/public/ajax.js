/*
=== PARTE A · LA FUNCIÓN checkCoupon ===

A1. CREAR una función llamada checkCoupon, sin parámetros

    --- Preparación ---
A2.     BUSCAR en la página el elemento con id "coupon"
        LEER el texto que el usuario escribió en él
        GUARDAR ese texto en una constante llamada couponCode

A3.     BUSCAR en la página el elemento con id "message"
        GUARDAR ese elemento en una constante llamada output

A4.     CREAR un intercomunicador nuevo (XMLHttpRequest)
        GUARDARLO en una constante llamada xhr

A5.     ESCRIBIR el texto "validating..." dentro de output

    --- Configurar el intercomunicador ---
A6.     ABRIR el intercomunicador (xhr) con:
            - método: POST
            - dirección: /coupon-check
            - modo: asíncrono (verdadero)

A7.     PONERLE la etiqueta al mensaje (encabezado):
            - nombre: Content-Type
            - valor: application/x-www-form-urlencoded

    --- Qué hacer cuando llegue la respuesta ---
A8.     CUANDO cambie el estado del intercomunicador:
            SI el estado es "terminado" (DONE)
            Y el código de respuesta es 200
            ENTONCES:
                ESCRIBIR la respuesta del servidor dentro de output

    --- Enviar la pregunta ---
A9.     ENVIAR por el intercomunicador el texto:
            "coupon=" + couponCode codificado con encodeURIComponent

FIN de la función checkCoupon


=== PARTE B · CONECTAR LA FUNCIÓN CON EL USUARIO ===

B1. BUSCAR en la página el botón con id "btn-coupon"
    CUANDO el usuario haga clic en él:
        EJECUTAR checkCoupon

B2. BUSCAR en la página el campo con id "coupon"
    CUANDO el usuario presione una tecla en él:
        SI la tecla es "Enter"
        ENTONCES:
            CANCELAR el comportamiento normal de la tecla
            EJECUTAR checkCoupon
*/
const btnCoupon = document.getElementById('btn-coupon');
const couponInput = document.getElementById('coupon');

const checkCoupon = () => {
    const couponCode = couponInput.value;
    const output = document.getElementById('message');
    const xhr = new XMLHttpRequest();
    output.textContent = 'Validating...';
    xhr.open('POST', '/coupon-check', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            output.innerHTML = xhr.responseText;
        }
    };
    xhr.send('coupon=' + encodeURIComponent(couponCode));
};

btnCoupon.addEventListener('click', checkCoupon);
couponInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkCoupon();
    }
});