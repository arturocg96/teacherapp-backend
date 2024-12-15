const pool = require("../config/db");

async function listarProfesores() {
  const [rows] = await pool.query(
    `SELECT usuarios.id, usuarios.nombre, usuarios.apellidos, usuarios.email, usuarios.rol, usuarios.foto, usuarios.activo, profesores.precio_hora, profesores.localizacion, profesores.telefono, profesores.meses_experiencia, profesores.validado, profesores.sobre_mi FROM usuarios JOIN profesores ON usuarios.id = profesores.usuarios_id WHERE usuarios.rol = 'profesor'`
  );
  return rows;
}

async function selectAllMateriasDeProfesor() {
  const [result] = await pool.query(`SELECT 
    p.id,
    u.nombre AS nombre,
    u.apellidos AS apellidos,
    u.id AS usuario_id,
    u.email,
    u.rol,
    u.foto,
    u.activo,
    p.precio_hora,
    p.localizacion,
    p.telefono,
    p.meses_experiencia,
    p.validado,
    p.sobre_mi,
    (
        SELECT JSON_ARRAYAGG(m_unique.nombre)
        FROM (
            SELECT m.nombre
            FROM materias_profesores mp
            JOIN materias m ON mp.Materias_id = m.id
            WHERE mp.usuarios_id = p.usuarios_id
            GROUP BY m.nombre
        ) m_unique
    ) AS materias,
     CAST((SELECT AVG(o.puntuacion) 
          FROM opiniones o 
          WHERE o.profesor_id = u.id) AS FLOAT) AS puntuacion,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'estudiante_id', o.estudiante_id,
                'estudiante_nombre', eu.nombre,
                'puntuacion', o.puntuacion,
                'comentario', o.comentario,
                'fecha', o.fecha
            )
        )
        FROM opiniones o
        LEFT JOIN usuarios eu ON o.estudiante_id = eu.id
        WHERE o.profesor_id = u.id
    ) AS opiniones
FROM 
    profesores p
JOIN 
    usuarios u ON p.usuarios_id = u.id
GROUP BY 
    p.id, 
    u.nombre, 
    u.apellidos, 
    u.email, 
    u.rol, 
    u.foto, 
    u.activo, 
    p.precio_hora, 
    p.localizacion, 
    p.telefono, 
    p.meses_experiencia, 
    p.validado, 
    p.sobre_mi;`);
  return result;
}

async function insertProfesor({ usuario, profesor, materias }) {
  const [usuarioResult] = await pool.query(
    "INSERT INTO usuarios (nombre, apellidos, email, password, rol, foto, activo) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      usuario.nombre,
      usuario.apellidos,
      usuario.email,
      usuario.password,
      "profesor",
      usuario.foto,
      1,
    ]
  );
  const usuarioId = usuarioResult.insertId;

  await pool.query(
    "INSERT INTO profesores (usuarios_id, precio_hora, localizacion, telefono, meses_experiencia, validado) VALUES (?, ?, ?, ?, ?, ?)",
    [
      usuarioId,
      profesor.precio_hora,
      profesor.localizacion,
      profesor.telefono,
      profesor.meses_experiencia,
      0,
    ]
  );

  if (materias && materias.length) {
    const values = materias.map((materiaId) => [usuarioId, materiaId]);
    await pool.query(
      "INSERT INTO materias_profesores (usuarios_id, Materias_id) VALUES ?",
      [values]
    );
  }

  return usuarioId;
}

async function updateProfesor(profesorId, { usuario, profesor, materias }) {
  await pool.query(
    "UPDATE usuarios SET nombre = ?, apellidos = ?, email = ?, password = COALESCE(?, password), foto = ?, activo = ? WHERE id = ?",
    [
      usuario.nombre,
      usuario.apellidos,
      usuario.email,
      usuario.password,
      usuario.foto,
      usuario.activo,
      profesorId,
    ]
  );

  await pool.query(
    "UPDATE profesores SET telefono = ?, precio_hora = ?, localizacion = ?, meses_experiencia = ?, validado = ? WHERE usuarios_id = ?",
    [
      profesor.telefono,
      profesor.precio_hora,
      profesor.localizacion,
      profesor.meses_experiencia,
      profesor.validado,
      profesorId,
    ]
  );

  await pool.query("DELETE FROM materias_profesores WHERE usuarios_id = ?", [
    profesorId,
  ]);


  if (materias && materias.length) {

    const values = materias
      .filter((materiaId) => materiaId !== null && materiaId !== undefined)
      .map((materiaId) => [profesorId, materiaId]);

    if (values.length) {

      await pool.query(
        "INSERT INTO materias_profesores (usuarios_id, Materias_id) VALUES ?",
        [values]
      );
    } else {
      console.log("No hay materias válidas para asociar al profesor.");
    }
  } else {
    console.log("No se enviaron materias para asociar al profesor.");
  }

  return profesorId;
}

async function selectProfesorById(profesorId) {
  const [usuario] = await pool.query(
    'SELECT * FROM usuarios WHERE id = ? AND rol = "profesor"',
    [profesorId]
  );
  if (usuario.length === 0) return null;

  const [profesor] = await pool.query(
    "SELECT * FROM profesores WHERE usuarios_id = ?",
    [profesorId]
  );
  const [materias] = await pool.query(
    "SELECT Materias_id FROM materias_profesores WHERE usuarios_id = ?",
    [profesorId]
  );

  return {
    usuario: usuario[0],
    profesor: profesor[0],
    materias: materias.map((m) => m.Materias_id),
  };
}

async function validarDesvalidarProfesor(id, validado) {
  const [result] = await pool.query(
    "UPDATE profesores SET validado = ? WHERE usuarios_id = ?",
    [validado, id]
  );
  return result.affectedRows > 0;
}

async function obtenerCorreosAdministradores() {
  const [rows] = await pool.query(
    'SELECT email FROM usuarios WHERE rol = "administrador" AND activo = 1'
  );
  return rows.map((row) => row.email);
}

async function updateProfesorSobreMi(profesorUsuarioId, sobre_mi) {
  const [result] = await pool.query(
    "UPDATE profesores SET sobre_mi = ? WHERE usuarios_id = ?",
    [sobre_mi, profesorUsuarioId]
  );

  // Si se actualiza correctamente, devolvemos el objeto actualizado
  if (result.affectedRows > 0) {
    const [profesor] = await pool.query(
      "SELECT * FROM profesores WHERE usuarios_id = ?",
      [profesorUsuarioId]
    );
    return profesor;
  } else {
    return null;
  }
}

module.exports = {
  listarProfesores,
  selectAllMateriasDeProfesor,
  insertProfesor,
  updateProfesor,
  selectProfesorById,
  validarDesvalidarProfesor,
  obtenerCorreosAdministradores,
  updateProfesorSobreMi,
};
