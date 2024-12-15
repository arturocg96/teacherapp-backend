const router = require("express").Router();
const {
  obtenerProfesores,
  obtenerProfesor,
  registroProfesor,
  actualizarProfesor,
  validarDesvalidar,
  obtenerMateriasDeProfesor,
  actualizarProfesorSobreMi,
} = require("../../controllers/profesoresController");
const {
  uploadToImgProfile,
  checkRolAdministrador,
  checkToken,
  checkUsuarioById,
} = require("../../utils/middlewares");

router.get("/", obtenerProfesores);
router.get("/profesor-materias", obtenerMateriasDeProfesor);
router.get("/:id", obtenerProfesor);
router.post("/registro", uploadToImgProfile.single("imagen"), registroProfesor);
router.put(
  "/:id",
  checkToken,
  checkUsuarioById,
  uploadToImgProfile.single("imagen"),
  actualizarProfesor
);
router.patch("/sobremi/:id", checkToken, actualizarProfesorSobreMi);
router.put(
  "/validar/:id",
  checkToken,
  checkRolAdministrador,
  validarDesvalidar
);

module.exports = router;
