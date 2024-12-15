const pool = require("../config/db");

const selectAllInscripciones = () => {
  return pool.query("select * from inscripciones_clase");
};

const selectAllInscripcionesByEstudianteId = (estudianteId) => {
  return pool.query(
    `SELECT 
      inscripciones_clase.id AS id,
      alumno_id,
      profesor_id,
      nombre AS nombre_profesor,
      apellidos AS apellidos_profesor,
      foto AS foto_profesor,
      email AS email_profesor,
      profesores.precio_hora AS precio_hora,
      profesores.telefono AS telefono,
      profesores.meses_experiencia AS meses_experiencia,
      fecha_registro,
      fecha_fin
    FROM inscripciones_clase
    INNER JOIN usuarios ON inscripciones_clase.profesor_id = usuarios.id
    INNER JOIN profesores ON inscripciones_clase.profesor_id = profesores.usuarios_id
    WHERE inscripciones_clase.alumno_id = ? `,
    [estudianteId]
  );
};

const selectAllInscripcionesByProfesorId = (profesorId) => {
  return pool.query(
    `SELECT
      inscripciones_clase.id AS id,
      profesor_id,
      alumno_id,
      nombre AS nombre_alumno,
      profesores.precio_hora AS precio_hora,
      profesores.telefono AS telefono,
      profesores.meses_experiencia AS meses_experiencia,
      usuarios.email AS email_profesor, 
      apellidos AS apellidos_alumno,
      foto AS foto_alumno,
      email AS email_alumno,
      fecha_registro,
      fecha_fin
    FROM inscripciones_clase
    INNER JOIN usuarios ON inscripciones_clase.alumno_id = usuarios.id
    INNER JOIN profesores ON inscripciones_clase.profesor_id = profesores.usuarios_id
    WHERE profesor_id = ?`,
    [profesorId]
  );
};

const selectInscripcion = (id) => {
  return pool.query("select * from inscripciones_clase where id = ?", [id]);
};

const insertInscripcion = ({ alumno_id, profesor_id }) => {
  return pool.query(
    "insert into inscripciones_clase (alumno_id, profesor_id, fecha_registro) values (?, ?, NOW()); ",
    [alumno_id, profesor_id]
  );
};

const closeInscripcion = (id) => {
  return pool.query(
    "update inscripciones_clase set fecha_fin = NOW() where id = ?",
    [id]
  );
};

module.exports = {
  selectAllInscripcionesByEstudianteId,
  selectAllInscripcionesByProfesorId,
  selectAllInscripciones,
  selectInscripcion,
  insertInscripcion,
  closeInscripcion,
};
