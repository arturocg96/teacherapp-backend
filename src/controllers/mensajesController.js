const {
  sendMensaje,
  selectMsjById,
  selectMsjEmitUser,
  Readmsj,
  selectMensajesEntreUsuarios,
  getMisAlumnos,
  getMisProfesores,
} = require("../models/mensajesModel");

//llama a //enviar msj y devulve el mensaje enviado id
const enviarmensaje = async (req, res, next) => {
  try {
    const [result] = await sendMensaje(req.body);
    const msj = await selectMsjById(result.insertId);
    res.json(msj);
  } catch (error) {
    next(error);
  }
};

//llama a // mensajes sin leer de un usuario
const mensajesNoLeidos = async (req, res, next) => {
  const { userid } = req.params;
  try {
    const mensajes = await selectMsjEmitUser(userid);
    res.json(mensajes);
  } catch (error) {
    next(error);
  }
};

//llama a //marca como leido un mensaje
const marcarLeido = async (req, res, next) => {
  try {
    const { msjid } = req.params;
    const result = await Readmsj(msjid);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const obtenerMensajesEntreUsuarios = async (req, res, next) => {
  const { emisor_id, destinatario_id } = req.params;
  try {
    const mensajes = await selectMensajesEntreUsuarios(
      emisor_id,
      destinatario_id
    );
    res.json(mensajes);
  } catch (error) {
    next(error);
  }
};

/* llama a funcion getMisAlumnos */
const misAlumnos = async (req, res, next) => {
  const { userid } = req.params;
  try {
    const alumnos = await getMisAlumnos(userid);
    res.json(alumnos);
  } catch (error) {
    next(error);
  }
};
//mis profesores
const misProfesores = async (req, res, next) => {
  const { userid } = req.params;
  try {
    const profesores = await getMisProfesores(userid);
    res.json(profesores);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  enviarmensaje,
  mensajesNoLeidos,
  marcarLeido,
  obtenerMensajesEntreUsuarios,
  misAlumnos,
  misProfesores,
};
