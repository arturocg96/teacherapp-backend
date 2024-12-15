const router = require("express").Router();
const { checkToken } = require("../../utils/middlewares");

const {
  getAllInscripciones,
  getAllInscripcionesByProfesorId,
  getAllInscripcionesByEstudianteId,
  getInscripcionById,
  postInscripcion,
  dropInscripcion,
} = require("../../controllers/inscripcionesController");

router.get("/", checkToken, getAllInscripciones);
router.get("/profesor/:id", checkToken, getAllInscripcionesByProfesorId);
router.get("/estudiante/:id", checkToken, getAllInscripcionesByEstudianteId);
router.get("/inscripcion/:id", checkToken, getInscripcionById);
router.post("/:profesorId", checkToken, postInscripcion);
router.put("/cerrar/:id", checkToken, dropInscripcion);

module.exports = router;
