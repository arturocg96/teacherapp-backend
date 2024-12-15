const bcrypt = require("bcryptjs");

const { createToken } = require("../utils/helpers");
const {
  selectAllUsers,
  toggleUsuarioActivo,
  selectUserById,
  insertAdmin,
} = require("../models/usersModel");

const getAllUsers = async (req, res) => {
  try {
    const [result] = await selectAllUsers();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const [result] = await selectUserById(req.params.id);
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const actualizarEstadoUsuario = async (req, res) => {
  const { id } = req.params;
  const { activo } = req.body;

  try {
    const result = await toggleUsuarioActivo(id, activo);
    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({
      message: `Usuario ${activo ? "activado" : "desactivado"} correctamente`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el estado del usuario" });
  }
};

/**
 * Función consumida por middlewares para recuperar el usuario.
 * @params(id) id del usuario.
 * @returns usuario
 * */
const selectUserFromMiddlewareById = async (id) => {
  const [result] = await selectUserById(id);
  return result[0];
};

/**
 función para registrar un administador
 sólo se usará para registrar a mano desde el backend
 */
const registroAdmin = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);

    const adminId = await insertAdmin(req.body);
    const [admin] = await selectUserById(adminId);
    res.json(admin);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  actualizarEstadoUsuario,
  selectUserFromMiddlewareById,
  registroAdmin,
};
