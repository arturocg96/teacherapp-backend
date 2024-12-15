const pool = require("../config/db");

const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const {
  selectUserFromMiddlewareById,
} = require("../controllers/usersController");

// Middleware de multer
const uploadToImgProfile = multer({
  dest: path.join(__dirname, "../Public/img/profiles/"),
});

const checkToken = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res
      .status(403)
      .json({ message: "Debes incluir la cabecera de Authorization" });
  }

  const token = req.headers["authorization"];

  let data;
  try {
    data = jwt.verify(token, process.env.CLAVE);
  } catch (error) {
    return res.status(403).json({ message: "El token es incorrecto" });
  }

  let usuario;
  try {
    usuario = await selectUserFromMiddlewareById(data.usuario_id);
    if (!usuario) {
      return res.status(403).json({ message: "El usuario no existe" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al verificar el token" });
  }

  req.user = usuario;

  next();
};

const checkRolAdministrador = async (req, res, next) => {
  try {
    if (req.user.rol !== "administrador") {
      return res.status(403).json({
        message: "Acceso denegado: no tienes permisos de administrador",
      });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al verificar el rol de administrador", error });
  }
};

// Middleware para verificar que el usuario logueado coincide con el ID solicitado
const checkUsuarioById = (req, res, next) => {
  const { id } = req.params;

  if (req.user.id !== parseInt(id, 10)) {
    return res
      .status(403)
      .json({ message: "Acceso denegado: no puedes modificar este usuario" });
  }

  next();
};

module.exports = {
  checkToken,
  uploadToImgProfile,
  checkRolAdministrador,
  checkUsuarioById,
};
