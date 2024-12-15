const pool = require("../config/db");

async function listarAlumnos() {
  const [rows] = await pool.query(
    `SELECT id, nombre, apellidos, email, rol, foto, activo FROM usuarios WHERE rol = 'alumno'`
  );
  return rows;
}

async function selectAlumnoById(alumnoId) {
  const [result] = await pool.query(
    `SELECT id, nombre, apellidos, email, foto, rol, activo 
         FROM usuarios 
         WHERE id = ? AND rol = 'alumno'`,
    [alumnoId]
  );
  return result[0] || null;
}

async function insertAlumno({ nombre, apellidos, email, password, foto }) {
  const [result] = await pool.query(
    `INSERT INTO usuarios (nombre, apellidos, email, password, rol, foto, activo) 
         VALUES (?, ?, ?, ?, 'alumno', ?, 1)`,
    [nombre, apellidos, email, password, foto]
  );
  return result.insertId;
}

async function updateAlumno(
  alumnoId,
  { nombre, apellidos, email, password, foto, activo }
) {
  await pool.query(
    `UPDATE usuarios 
         SET nombre = ?, apellidos = ?, email = ?, password = COALESCE(?, password), foto = ?, activo = ? 
         WHERE id = ? AND rol = 'alumno'`,
    [nombre, apellidos, email, password, foto, activo, alumnoId]
  );
  return alumnoId;
}


const selectAlumnoByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT id FROM usuarios WHERE email = ? AND rol = 'alumno'",
    [email]
  );
  return rows.length > 0 ? rows[0] : null;
};


module.exports = {
  selectAlumnoById,
  insertAlumno,
  updateAlumno,
  listarAlumnos, 
  selectAlumnoByEmail
};
