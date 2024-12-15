const {
  enviarmensaje,
  mensajesNoLeidos,
  marcarLeido,
  obtenerMensajesEntreUsuarios,
  misAlumnos,
  misProfesores,
} = require("../../controllers/mensajesController");
const router = require("express").Router();

router.get("/:userid", mensajesNoLeidos);
router.get("/misalumnos/:userid", misAlumnos);
router.get("/misprofesores/:userid", misProfesores);
router.get("/:emisor_id/:destinatario_id", obtenerMensajesEntreUsuarios);

router.post("/enviar", enviarmensaje);
router.patch("/:msjid", marcarLeido);

module.exports = router;
