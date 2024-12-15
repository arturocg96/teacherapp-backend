const router = require("express").Router();

const {
  getAllOpiniones,
  getOpinionByIds,
  getOpinionesByProfesorId,
  getOpinionesByEstudianteId,
  createOpinion,
  updateOpinion,
  deleteOpinion,
} = require("../../controllers/opinionesController");
const { checkToken } = require("../../utils/middlewares");

router.get("/", getAllOpiniones);
router.post("/", checkToken, createOpinion);
router.get("/profesor/:id", getOpinionesByProfesorId);
router.get("/estudiante/:id", getOpinionesByEstudianteId);
router.get("/single/:idEstudiante/:idProfesor", getOpinionByIds);
router.put("/single/:idEstudiante/:idProfesor", checkToken, updateOpinion);
router.delete("/single/:idEstudiante/:idProfesor", checkToken, deleteOpinion);

module.exports = router;
