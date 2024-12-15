const {
  enviarEmail,
  actualizarpass,
  verificarlink,
} = require("../../controllers/recuperarClaveController");

const router = require("express").Router();

router.get("/restablecermiclave/:code", verificarlink);
router.post("/", enviarEmail);
router.post("/restablecermiclave", actualizarpass);

module.exports = router;
