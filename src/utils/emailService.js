const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EMAIL_USER = process.env.EMAIL_USER;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function enviarCorreo(destinatarios, asunto, contenido) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        type: "OAuth2",
        user: EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const info = await transporter.sendMail({
      from: `"TeacherApp" <${EMAIL_USER}>`,
      to: destinatarios.join(", "),
      subject: asunto,
      html: contenido,
    });

    console.log("Correo enviado: %s", info.messageId);
  } catch (error) {
    console.error("Error al enviar correo: ", error);
  }
}

function generarMensajeRegistroProfesor(profesor) {
  const localizacion = profesor.profesor.localizacion
    ? JSON.parse(profesor.profesor.localizacion).address
    : "No especificada";

  const asunto = "Nuevo registro de profesor - Requiere validación";
  const contenido = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #000; line-height: 1.8; padding: 20px; border: 1px solid #ccc; border-radius: 10px; max-width: 600px; margin: auto; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
      <h2 style="text-align: center; text-transform: uppercase; font-size: 22px; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px;">Nuevo Registro de Profesor</h2>
      <p><strong>Nombre:</strong> ${profesor.usuario.nombre} ${
    profesor.usuario.apellidos
  }</p>
      <p><strong>Email:</strong> ${profesor.usuario.email}</p>
      <p><strong>Teléfono:</strong> ${
        profesor.profesor.telefono || "No disponible"
      }</p>
      <p><strong>Precio por hora:</strong> ${
        profesor.profesor.precio_hora || "No especificado"
      } €</p>
      <p><strong>Meses de experiencia:</strong> ${
        profesor.profesor.meses_experiencia || "No especificado"
      }</p>
      <p><strong>Dirección:</strong> ${localizacion}</p>
      <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
      <p style="text-align: center;">Por favor, accede a la plataforma para validar el registro del profesor.</p>
    </div>
  `;
  return { asunto, contenido };
}

module.exports = { enviarCorreo, generarMensajeRegistroProfesor };
