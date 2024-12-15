const { selectByEmail } = require("../models/usersModel");
const pool = require("../config/db");
const crypto = require("crypto");
const {
  actualizarUsuarioConCodigo,
  actualizarpassword,
  Codigoexpirect,
} = require("../models/recuperarClaveModel");
const { enviarCorreoRestablecimiento } = require("../utils/resetpassword");

const generarCodigo = () => {
  return crypto.randomBytes(5).toString("hex").substring(0, 10);
}; //codigo aleatorio

//envia email con el enlace
const enviarEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const usuario = await selectByEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: "Email invalido ó incorrecto" });
    }
    const codigo = generarCodigo();
    const expiracion = new Date(Date.now());
    const asunto = "Restablecimiento de Contraseña";
    await actualizarUsuarioConCodigo(codigo, expiracion, email);
    await enviarCorreoRestablecimiento(email, asunto, codigo);
    res.status(200).json({ message: "email correcto" });
  } catch (error) {
    next(error);
  }
};

//comprueba si el link es correcto y no ha caducado
const verificarlink = async (req, res, next) => {
  const { code } = req.params;
  try {
    const resul = await Codigoexpirect(code);
    if (resul.valido === false) {
      return res.status(401).json({ message: "caduco" }); // Si el código no es válido o esta caducado
    } else {
      return res.status(200).json({ message: "valido" }); // Si el código es válido
    }
  } catch (error) {
    next(error);
  }
};

//envia nuevo pass a actualizar
const actualizarpass = async (req, res, next) => {
  const { code, newpass } = req.body;
  try {
    const update = await actualizarpassword(code, newpass);
    res.status(200).json({ message: "contraseña actualizada" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  enviarEmail,
  actualizarpass,
  verificarlink,
};
