//CREATING THE EXPRESS APP
const express = require("express");
const cors = require("cors");
const path = require("node:path");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", require("./routes/apiRoutes"));

// Servir archivos estáticos desde la carpeta Public
app.use("/", express.static(path.join(__dirname, "Public")));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(err);
});

module.exports = app;
