/*
1. Traer las herramientas express y path
2. Crear la tienda (app)
3. Crear la lista de cupones válidos
4. Decirle a la tienda que entregue los archivos de la carpeta public
5. Poner al empleado que abre los sobres de los formularios
6. Abrir una ventanilla para /coupon-check, que recibe el cupón:
   a. Limpiar el cupón y pasarlo a mayúsculas
   b. Si el cupón está en la lista, responder "Coupon validated"
   c. Si no está, responder "Invalid coupon"
7. Abrir la puerta 3000 y avisar en la terminal
*/

const express = require('express');
const path = require('path');
const app = express();
const couponCodes = ['SAVE10', 'FREESCOOP', 'SUMMER26'];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.post('/coupon-check', (request, response) => {
   const coupon = request.body.coupon.trim().toUpperCase();
   if (couponCodes.includes(coupon)) {
      response.status(200).send(`<span class="valid">Coupon validated</span>`);
   } else {
      response.send(`<span class="invalid">Invalid coupon</span>`);
   }
});

app.listen(3000, () => {
   console.log('Server running on http://localhost:3000');
});