const {
  selectAllMaterias,
  selectMateriasByProfesorId,
} = require("../models/materiasModel");

const obtenerMaterias = async (req, res, next) => {
  try {
    const materias = await selectAllMaterias();
    res.json(materias);
  } catch (error) {
    next(error);
  }
};

const obtenerMateriasPorProfesor = async (req, res, next) => {
  try {
    const profesorId = req.params.profesorId;
    const materiasProfesor = await selectMateriasByProfesorId(profesorId);
    res.json(materiasProfesor);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerMaterias,
  obtenerMateriasPorProfesor,
};
