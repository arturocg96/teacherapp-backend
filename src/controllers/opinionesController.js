const {
  selectAllInscripcionesByEstudianteId,
} = require("../models/inscripcionesModel");
const {
  selectAllOpiniones,
  selectOpinionesByProfesorId,
  selectOpinionesByEstudianteId,
  updateOpinionByIds,
  deleteOpinionByIds,
  selectOpinionesByIds,
  insertOpinion,
} = require("../models/opinionesModel");

const getAllOpiniones = async (req, res, next) => {
  try {
    const [opiniones] = await selectAllOpiniones();
    res.status(200).json(opiniones);
  } catch (error) {
    next(error);
  }
};

const getOpinionByIds = async (req, res, next) => {
  try {
    const { idEstudiante, idProfesor } = req.params;
    const opinion = await selectOpinionesByIds(idEstudiante, idProfesor);
    res.status(200).json(opinion);
  } catch (error) {
    next(error);
  }
};

const getOpinionesByProfesorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const opiniones = await selectOpinionesByProfesorId(id);
    res.status(200).json(opiniones);
  } catch (error) {
    next(error);
  }
};

const getOpinionesByEstudianteId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const opiniones = await selectOpinionesByEstudianteId(id);
    res.status(200).json(opiniones);
  } catch (error) {
    next(error);
  }
};

const createOpinion = async (req, res, next) => {
  try {
    //* El alumno solo podrá puntuar y opinar sobre los diferentes profesores siempre y cuando haya sido alumno suyo en algún momento.

    const usuario = req.user;
    const { profesor_id, puntuacion, comentario } = req.body;

    // Comprobamos si es alumno
    if (usuario.rol !== "alumno") {
      return res
        .status(403)
        .json({ message: "Sólo los alumnos pueden publicar una opinión" });
    }

    // Comprobamos si el alumno ha sido alumno del profesor del que quiere opinar.
    const [inscripcionesAlumno] = await selectAllInscripcionesByEstudianteId(
      usuario.id
    );
    if (
      !inscripcionesAlumno ||
      !inscripcionesAlumno.some(
        (inscripcion) => inscripcion.profesor_id === profesor_id
      )
    ) {
      return res.status(403).json({
        message: "Hay que haber sido alumno del profesor para opinar sobre él",
      });
    }

    const result = await insertOpinion({
      estudiante_id: usuario.id,
      profesor_id,
      puntuacion,
      comentario,
    });
    const nuevaOpinion = await selectOpinionesByIds(usuario.id, profesor_id);
    res.status(201).json(nuevaOpinion);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ message: "Ya has opinado sobre este profesor" });
    }
    next(error);
  }
};

const updateOpinion = async (req, res, next) => {
  try {
    const { idEstudiante, idProfesor } = req.params;
    const opinion = req.body;

    const [resultado] = await updateOpinionByIds(
      idEstudiante,
      idProfesor,
      opinion
    );

    if (resultado.affectedRows === 0)
      return res.status(404).json({ message: "Opinion no encontrada" });

    const opinionActualizada = await selectOpinionesByIds(
      idEstudiante,
      idProfesor
    );

    res.status(200).json(opinionActualizada);
  } catch (error) {
    next(error);
  }
};

const deleteOpinion = async (req, res, next) => {
  try {
    const { idEstudiante, idProfesor } = req.params;
    const [resultado] = await deleteOpinionByIds(idEstudiante, idProfesor);

    if (resultado.affectedRows === 0)
      return res.status(404).json({ message: "Opinion no encontrada" });

    res.status(200).json({ message: "Opinion eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOpiniones,
  getOpinionByIds,
  getOpinionesByProfesorId,
  getOpinionesByEstudianteId,
  createOpinion,
  updateOpinion,
  deleteOpinion,
};
