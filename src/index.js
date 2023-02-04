const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// SDK de Mercado Pago
const mercadopago = require("mercadopago");

//middleware

app.use(bodyParser.urlencoded({ extended: false }));

// Agrega credenciales
mercadopago.configure({
  access_token:
    "APP_USR-3248474346383256-121911-3cd56dfa5c4fdc916795b79a085dd93c-1266633934",
});

//routes
app.get("/checkout", (req, res) => {
  res.send("Funcionando correctamente");
});

app.post("/checkout", (req, res) => {
  // Crea un objeto de preferencia

  let preference = {
    items: [
      {
        title: "Donación a Wallet",
        //title:req.body.title,
        unit_price: parseInt(req.body.price),
        //quantity: 1,
      },
    ],
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

//server

app.listen(3000, () => {
  console.log("Server on port 3000");
});
