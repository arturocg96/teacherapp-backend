const express = require("express");
const router = express.Router();
const {
  obtenerMaterias,
  obtenerMateriasPorProfesor,
} = require("../../controllers/materiasController");

router.get("/", obtenerMaterias);
router.get("/profesor-materias/:profesorId", obtenerMateriasPorProfesor);

module.exports = router;
