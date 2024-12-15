const pool = require("../config/db");

//enviar mensaje: emisor-destino
function sendMensaje({ emisor_id, destinatario_id, asunto, contenido }) {
  return pool.query(
    "insert into mensajes (emisor_id,destinatario_id,asunto,contenido,leido) values (?,?,?,?,false);",
    [emisor_id, destinatario_id, asunto, contenido]
  );
}

//devuelve mensaje por id
async function selectMsjById(msjid) {
  const [result] = await pool.query("select * from mensajes where id = ?", [
    msjid,
  ]);
  if (result.length === 0) return null;
  return result[0];
}

/* retorna mensajes sin leer de un usuario */
async function selectMsjEmitUser(userid) {
  const [result] = await pool.query(
    "SELECT m.*, u.nombre AS nombre_emisor, u.apellidos AS apellidos_emisor FROM mensajes m JOIN usuarios u ON m.emisor_id = u.id WHERE m.destinatario_id = ? AND m.leido = false;",
    [userid]
  );
  if (result.length === 0) return null;
  return result;
}

/* marca como leido un mensaje */
async function Readmsj(msjid) {
  const [result] = await pool.query(
    "UPDATE mensajes SET leido = true WHERE id = ?",
    [msjid]
  );
  if (result.length === 0) return null;
  return result;
}

/* Consulta para obtener todos los mensajes entre el emisor y destinatario */
async function selectMensajesEntreUsuarios(emisor_id, destinatario_id) {
  const [result] = await pool.query(
    `SELECT * FROM mensajes
WHERE (emisor_id = ? AND destinatario_id = ?)
   OR (emisor_id = ? AND destinatario_id = ?)
ORDER BY id ASC;`,
    [emisor_id, destinatario_id, destinatario_id, emisor_id]
  );
  if (result.length === 0) {
    return []; //devolvera array vacío si no se encuentran mensajes
  }
  return result; // Devuelve los mensajes
}

/* obtitne los alumnos de un profesor */
async function getMisAlumnos(userid) {
  const [result] = await pool.query(
    "select distinct u.id,u.nombre,u.apellidos,u.foto,u.rol from usuarios as u inner join inscripciones_clase on u.id = inscripciones_clase.alumno_id where inscripciones_clase.profesor_id = ?;",
    [userid]
  );
  if (result.length === 0) return null;
  return result;
}
/* obtitne los profesores de un alumno */
async function getMisProfesores(userid) {
  const [result] = await pool.query(
    "select distinct u.id,u.nombre,u.apellidos,u.foto,u.rol from usuarios as u inner join inscripciones_clase on u.id = inscripciones_clase.profesor_id where inscripciones_clase.alumno_id =?;",
    [userid]
  );
  if (result.length === 0) return null;
  return result;
}

module.exports = {
  sendMensaje,
  selectMsjById,
  selectMsjEmitUser,
  Readmsj,
  selectMensajesEntreUsuarios,
  getMisAlumnos,
  getMisProfesores,
};
