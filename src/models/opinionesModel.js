const pool = require("../config/db");

function selectAllOpiniones() {
  return pool.query("select * from opiniones");
}

async function selectOpinionesByIds(idEstudiante, idProfesor) {
  const [result] = await pool.query(
    "select * from opiniones where estudiante_id = ? and profesor_id = ?",
    [idEstudiante, idProfesor]
  );

  if (result.length === 0) return null;

  return result;
}

async function selectOpinionesByProfesorId(profesorId) {
  const [result] = await pool.query(
    "select * from opiniones where profesor_id = ?",
    [profesorId]
  );

  if (result.length === 0) return null;

  return result;
}

async function selectOpinionesByEstudianteId(estudianteId) {
  const [result] = await pool.query(
    "select * from opiniones where estudiante_id = ?",
    [estudianteId]
  );

  if (result.length === 0) return null;

  return result;
}

function insertOpinion({ estudiante_id, profesor_id, puntuacion, comentario }) {
  return pool.query(
    "insert into opiniones (estudiante_id, profesor_id, puntuacion, comentario, fecha) values (?, ?, ?, ?, NOW())",
    [estudiante_id, profesor_id, puntuacion, comentario]
  );
}

function updateOpinionByIds(
  estudiante_id,
  profesor_id,
  { puntuacion, comentario }
) {
  return pool.query(
    "update opiniones set puntuacion = ?, comentario = ? where estudiante_id = ? and profesor_id = ?",
    [puntuacion, comentario, estudiante_id, profesor_id]
  );
}

function deleteOpinionByIds(idEstudiante, idProfesor) {
  return pool.query(
    "delete from opiniones where estudiante_id = ? and profesor_id = ?",
    [idEstudiante, idProfesor]
  );
}

module.exports = {
  selectAllOpiniones,
  selectOpinionesByIds,
  selectOpinionesByProfesorId,
  selectOpinionesByEstudianteId,
  insertOpinion,
  updateOpinionByIds,
  deleteOpinionByIds,
};
