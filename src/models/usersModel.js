const pool = require("../config/db");

function selectAllUsers() {
  return pool.query("select * from usuarios");
}

function selectUserById(id) {
  return pool.query("select * from usuarios where id = ?", [id]);
}

async function selectByEmail(email) {
  const [result] = await pool.query("select * from usuarios where email = ?", [
    email,
  ]);
  if (result.length === 0) return null;
  return result[0];
}

async function toggleUsuarioActivo(id, activo) {
  const [result] = await pool.query(
    "UPDATE usuarios SET activo = ? WHERE id = ?",
    [activo, id]
  );
  return result;
}

async function insertAdmin({ nombre, apellidos, email, password, activo }) {
  const [usuarioResult] = await pool.query(
    "INSERT INTO usuarios (nombre, apellidos, email, password, rol, activo) VALUES (?, ?, ?, ?, ?, ?)",
    [
      nombre,
      apellidos,
      email,
      password,
      "administrador",
      1,
    ]
  );
  const usuarioId = usuarioResult.insertId;

   return usuarioId;
}


module.exports = {
  selectAllUsers,
  selectUserById,
  selectByEmail,
  toggleUsuarioActivo,
  insertAdmin
};
