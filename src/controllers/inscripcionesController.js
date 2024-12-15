const {
  selectAllInscripciones,
  selectAllInscripcionesByEstudianteId,
  selectAllInscripcionesByProfesorId,
  selectInscripcion,
  insertInscripcion,
  closeInscripcion,
} = require("../models/inscripcionesModel");

const getAllInscripciones = async (req, res, next) => {
  try {
    const [inscripciones] = await selectAllInscripciones();
    res.status(200).json(inscripciones);
  } catch (error) {
    next(error);
  }
};

const getAllInscripcionesByEstudianteId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [inscripciones] = await selectAllInscripcionesByEstudianteId(id);
    res.status(200).json(inscripciones);
  } catch (error) {
    next(error);
  }
};

const getAllInscripcionesByProfesorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [inscripciones] = await selectAllInscripcionesByProfesorId(id);
    res.status(200).json(inscripciones);
  } catch (error) {
    next(error);
  }
};

const getInscripcionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inscripcion = await selectInscripcion(id);
    res.status(200).json(inscripcion);
  } catch (error) {
    next(error);
  }
};

const postInscripcion = async (req, res, next) => {
  try {
    const { profesorId } = req.params;
    const profesor_id = +profesorId;
    const alumno_id = req.user.id;
    const result = await insertInscripcion({ alumno_id, profesor_id });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const dropInscripcion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await closeInscripcion(+id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllInscripciones,
  getAllInscripcionesByEstudianteId,
  getAllInscripcionesByProfesorId,
  getInscripcionById,
  postInscripcion,
  dropInscripcion,
};
