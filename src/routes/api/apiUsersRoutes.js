const router = require("express").Router();
const {
  getAllUsers,
  actualizarEstadoUsuario,
  registroAdmin,
  getUserById,
} = require("../../controllers/usersController");
const {
  uploadToImgProfile,
  checkToken,
  checkRolAdministrador,
} = require("../../utils/middlewares");

router.get("/", getAllUsers);
router.get("/:id", checkToken, getUserById);
router.put(
  "/activar/:id",
  checkToken,
  checkRolAdministrador,
  actualizarEstadoUsuario
);
router.post("/registrarAdmin", registroAdmin);

module.exports = router;
