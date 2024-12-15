const pool = require("../config/db");

async function selectAllMaterias() {
  const [result] = await pool.query("SELECT * FROM materias");
  return result;
}

async function selectMateriasByProfesorId(profesorId) {
  const [materias] = await pool.query(
    `SELECT m.id, m.nombre 
         FROM materias AS m
         JOIN materias_profesores AS mp ON m.id = mp.Materias_id
         WHERE mp.usuarios_id = ?`,
    [profesorId]
  );
  return materias;
}

module.exports = {
  selectAllMaterias,
  selectMateriasByProfesorId,
};
