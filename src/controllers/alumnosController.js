const {
  selectAlumnoById,
  insertAlumno,
  updateAlumno,
  listarAlumnos,
  selectAlumnoByEmail,
} = require("../models/alumnoModel");

const bcrypt = require("bcryptjs");

const { saveProfileImage, deleteProfileImage } = require("../utils/helpers");

const obtenerAlumnos = async (req, res, next) => {
  try {
    const alumnos = await listarAlumnos();
    res.status(200).json(alumnos);
  } catch (error) {
    next(error);
  }
};

const obtenerAlumno = async (req, res, next) => {
  try {
    const alumno = await selectAlumnoById(req.params.id);
    if (!alumno) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }
    res.json(alumno);
  } catch (error) {
    next(error);
  }
};

const fs = require("fs");

const registroAlumno = async (req, res, next) => {
  let datos;
  try {
    datos = JSON.parse(req.body.datos);

    datos.password = await bcrypt.hash(datos.password, 8);

    const alumnoExistente = await selectAlumnoByEmail(datos.email);
    if (alumnoExistente) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    if (req.file) {
      datos.foto = saveProfileImage(req.file);
    }

    const alumnoId = await insertAlumno(datos);
    const nuevoAlumno = await selectAlumnoById(alumnoId);
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    // Si ocurre un error, y no se ha insertado el profesor en la BD borramos la NUEVA imagen del perfil.
    if (!nuevoAlumno || !nuevoAlumno.id) {
      if (datos.foto) deleteProfileImage(datos.foto);
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

const actualizarAlumno = async (req, res, next) => {
  let datos;
  let datosAntiguosDelAlumno;
  let alumnoActualizado;
  try {
    datos = JSON.parse(req.body.datos);

    // Si recibimos archivo, lo guardamos en la carpeta y sustituimos el nombre.
    if (req.file) {
      datos.foto = saveProfileImage(req.file);
      datosAntiguosDelAlumno = await selectAlumnoById(req.params.id);
    }

    // Si se recibe una nueva contraseña, la encriptamos, si no recuperamos la de la BD
    if (datos.password) {
      datos.password = await bcrypt.hash(datos.password, 8);
    } else {
      datos.password = req.user.password;
    }

    // Si el campo datos.foto viene vacío entonces no hemos recibido una nueva foto y no la actualizamos
    if (!datos.foto) {
      datos.foto = req.user.foto;
    }

    const alumnoActualizadoId = await updateAlumno(req.params.id, datos);

    if (datosAntiguosDelAlumno?.foto) {
      deleteProfileImage(datosAntiguosDelAlumno.foto);
    }

    alumnoActualizado = await selectAlumnoById(alumnoActualizadoId);
    if (!alumnoActualizado) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }
    res.json(alumnoActualizado);
  } catch (error) {
    // Si ocurre un error, y no se ha actualizado el profesor en la BD borramos la NUEVA imagen del perfil.
    if (!alumnoActualizado || !alumnoActualizado.id) {
      if (datos.foto) deleteProfileImage(datos.foto);
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

module.exports = {
  obtenerAlumnos,
  obtenerAlumno,
  registroAlumno,
  actualizarAlumno,
};
