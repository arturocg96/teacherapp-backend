const fs = require("node:fs");
const path = require("node:path");
const bcrypt = require("bcryptjs");

const { saveProfileImage, deleteProfileImage } = require("../utils/helpers");
const {
  insertProfesor,
  updateProfesor,
  selectProfesorById,
  listarProfesores,
  validarDesvalidarProfesor,
  obtenerCorreosAdministradores,
  selectAllMateriasDeProfesor,
  updateProfesorSobreMi,
} = require("../models/profesorModel");
const {
  enviarCorreo,
  generarMensajeRegistroProfesor,
} = require("../utils/emailService");

const obtenerProfesores = async (req, res, next) => {
  try {
    const profesores = await listarProfesores();
    res.status(200).json(profesores);
  } catch (error) {
    next(error);
  }
};

const obtenerProfesor = async (req, res, next) => {
  try {
    const profesor = await selectProfesorById(req.params.id);
    if (!profesor) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }
    res.json(profesor);
  } catch (error) {
    next(error);
  }
};

const obtenerMateriasDeProfesor = async (req, res, next) => {
  try {
    const materias_profesores = await selectAllMateriasDeProfesor();
    res.json(materias_profesores);
  } catch (error) {
    next(error);
  }
};

const registroProfesor = async (req, res, next) => {
  let profesor;
  let datos;
  try {
    datos = JSON.parse(req.body.datos);

    datos.usuario.password = await bcrypt.hash(datos.usuario.password, 8);

    // Guardar la imagen y retornar el nombre de la ruta relativa para la inserción.
    if (req.file) {
      datos.usuario.foto = saveProfileImage(req.file);
    }

    // Realiza la inserción del profesor
    const profesorId = await insertProfesor(datos);

    profesor = await selectProfesorById(profesorId);

    const correosAdministradores = await obtenerCorreosAdministradores();
    if (correosAdministradores.length > 0) {
      const { asunto, contenido } = generarMensajeRegistroProfesor(profesor);
      await enviarCorreo(correosAdministradores, asunto, contenido);
    }

    res.json(profesor);
  } catch (error) {
    // Si ocurre un error, y no se ha insertado el profesor en la BD borramos la NUEVA imagen del perfil.
    if (!profesor || !profesor.id) {
      deleteProfileImage(datos.usuario.foto);
    }

    // En todo caso comprobamos si sigue existiendo la imagen temporal y la eliminamos también.
    if (fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error al eliminar la imagen temporal:", err);
      });
    }

    next(error);
  }
};

const actualizarProfesor = async (req, res, next) => {
  let profesorActualizado;
  let oldProfesorData;
  let datos;
  try {
    datos = JSON.parse(req.body.datos);

    if (req.file) {
      datos.usuario.foto = saveProfileImage(req.file);
      oldProfesorData = await selectProfesorById(req.params.id);
    }

    if (datos.usuario.password) {
      datos.usuario.password = await bcrypt.hash(datos.usuario.password, 8);
    } else {
      datos.usuario.password = req.user.password;
    }

    if (!datos.usuario.foto) {
      datos.usuario.foto = req.user.foto;
    }

    profesorActualizado = await updateProfesor(req.params.id, datos);

    if (oldProfesorData?.usuario?.foto) {
      deleteProfileImage(oldProfesorData.usuario.foto);
    }

    if (!profesorActualizado) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }
    res.json(await selectProfesorById(profesorActualizado));
  } catch (error) {
    // Si ocurre un error, y no se ha actualizado el profesor en la BD borramos la NUEVA imagen del perfil.
    if (!profesorActualizado || !profesorActualizado.id) {
      deleteProfileImage(datos.usuario.foto);
    }

    // Si sigue existiendo la imagen temporal la eliminamos.
    if (fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error al eliminar la imagen temporal:", err);
      });
    }

    next(error);
  }
};

const validarDesvalidar = async (req, res, next) => {
  const { id } = req.params;
  const { validado } = req.body;

  try {
    const actualizado = await validarDesvalidarProfesor(id, validado);
    if (!actualizado) {
      return res
        .status(404)
        .json({ message: "Profesor no encontrado o rol incorrecto" });
    }
    const mensajeValidacion = validado
      ? "Profesor validado correctamente"
      : "Profesor desvalidado correctamente";
    res.status(200).json({ message: mensajeValidacion });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la validación del profesor",
      error,
    });
  }
};

const actualizarProfesorSobreMi = async (req, res, next) => {
  try {
    let datos = req.body;
    const [profesorActualizado] = await updateProfesorSobreMi(
      req.params.id,
      datos.sobre_mi
    );
    if (!profesorActualizado) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }
    res.json(profesorActualizado);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerProfesores,
  obtenerProfesor,
  obtenerMateriasDeProfesor,
  registroProfesor,
  actualizarProfesor,
  validarDesvalidar,
  actualizarProfesorSobreMi,
};
