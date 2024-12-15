const pool = require("../config/db");
const bcrypt = require("bcryptjs");

//crea codigo de usuario en la DB
async function actualizarUsuarioConCodigo(codigo, expiracion, email) {
  const [result] = await pool.query(
    "UPDATE usuarios SET psw_reset_code = ?, psw_reset_exp_date = ? WHERE email = ?",
    [codigo, expiracion, email]
  );
  if (result.affectedRows === 0) return null;
  return result;
}

//comprueba si el link ha expirado, cuando el usuario ingrese al enlace
async function Codigoexpirect(codigo) {
  const [res] = await pool.query(
    "SELECT psw_reset_exp_date FROM usuarios WHERE psw_reset_code = ?;",
    [codigo]
  );

  if (res.length === 0) {
    return { valido: false };
  } else {
    const expiracion = res[0].psw_reset_exp_date;
    const ahora = new Date();
    //const cincoMinutos = 6 * 60 * 1000; // 300,000 ms
    const unaHora = 60 * 60 * 1000;

    let diferencia = ahora - expiracion;
    if (diferencia > unaHora) {
      return { valido: false }; // Código caducado
    } else {
      return { valido: true }; // Código válido
    }
  }
}

//busca por codigo y selecciona usuario para actualizar
async function actualizarpassword(codigo, newpass) {
  const [res] = await pool.query(
    "SELECT email,psw_reset_exp_date FROM usuarios WHERE psw_reset_code = ?;",
    [codigo]
  );
  if (res.length === 0) {
    return null;
  }
  const hashdPassword = await bcrypt.hash(newpass, 8);

  const email = res[0].email;
  const [result] = await pool.query(
    "UPDATE usuarios SET password = ?, psw_reset_code = NULL WHERE email = ?;",
    [hashdPassword, email]
  );
  if (res.affectedRows === 0) return null;
  return result;
}

module.exports = {
  actualizarUsuarioConCodigo,
  actualizarpassword,
  Codigoexpirect,
};
