const jwt = require("jsonwebtoken");
const fs = require("node:fs");
const path = require("node:path");

const createToken = (usuario) => {
  const data = {
    usuario_id: usuario.id,
    usuario_rol: usuario.rol,
  };
  return jwt.sign(data, process.env.CLAVE);
};

/**
 * Renombrar de forma síncrona la imagen colocada por multer a un nombre aleatorio y devolver el nombre de la imagen para guardarla en bbdd
 *
 * @param {Object} file Objeto file devuelto por multer
 *
 * @returns {String} Nuevo nombre de la ruta para guardarla en bbdd
 */
const saveProfileImage = (file) => {
  // Obtener la extensión.
  const extension = file.originalname.split(".").at(-1);

  // Generar un nombre de archivo aleatorio y sin caracteres especiales
  const newFilenameRandom = Math.random().toString(36).substring(2);

  // Renombrar el archivo
  const newFilename = `${newFilenameRandom}.${extension}`;
  const newPath = `/Public/img/profiles/${newFilename}`;
  const fileSytemPath = path.join(__dirname, `..${newPath}`);
  fs.renameSync(file.path, fileSytemPath);

  // Retornar la ruta relativa a la carpeta estática para guardar en la BBDD.
  const bbddPath = `/img/profiles/${newFilename}`;

  return bbddPath;
};

const deleteProfileImage = (filepath) => {
  const fileSytemPath = path.join(__dirname, `../Public${filepath}`);
  if (fs.existsSync(fileSytemPath)) fs.unlinkSync(fileSytemPath);
};

module.exports = {
  createToken,
  saveProfileImage,
  deleteProfileImage,
};
