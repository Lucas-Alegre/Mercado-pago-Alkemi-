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
app.get("/check", (req, res) => {
  res.send("Funcionando correctamente");
});

app.post("/checkout", (req, res) => {
  // Crea un objeto de preferencia

  let preference = {
    items: [
      {
        title: req.body.name,
        quantity: 1,
        //picture_url: req.body.url,
        currency_id: "ARS",
        unit_price: parseInt(req.body.price),
      },
    ],
    back_urls: {
      success: "http://localhost:4200/home",
      //success: "https://angular-prueba-donar.vercel.app/",
      failure: "http://localhost:4200/home",
      pending: "http://localhost:4200/home",
    },
    notification_url: "https://angular-prueba-donar.vercel.app/",
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      //la respuesta trae un objeto con la url especificada en init_point
      console.log(response);
      //res.json(response);
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
