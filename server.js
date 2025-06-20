const express = require("express");
const mongoose = require("mongoose");
const server = express();
const produtoRoute = require("./routes/produtoRoute");
const cors = require('cors');
server.use(cors());
//middleware
server.use(
  express.urlencoded({
    extended: true,
  })
);

server.use(express.json());

server.use("/produto", produtoRoute);
server.use("/", produtoRoute);
server.use("/produto/:_id", produtoRoute);


const DB_USER = "lecs2795";
const DB_PASSWORD = encodeURIComponent("trabalhoweb");

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.se5vooi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Conectado ao Mongo!");
  })
  .catch((err) => {
    console.log(err);
  });
server.listen(3000);
