const router = require("express").Router();

router.use("/usuarios", require("./api/apiUsersRoutes"));
router.use("/profesores", require("./api/apiProfesoresRoutes"));
router.use("/alumnos", require("./api/apiAlumnosRoutes"));
router.use("/materias", require("./api/apiMateriasRoutes"));
router.use("/login", require("./api/apiLoginRoutes"));
router.use("/opiniones", require("./api/apiOpinionesRoutes"));
router.use("/inscripciones", require("./api/apiInscripcionesRoutes"));
router.use("/mensajes", require("./api/apiMensajesRoutes"));
router.use("/recuperarclave", require("./api/apiRecuperarclaveRoutes"));

module.exports = router;
