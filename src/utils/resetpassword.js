const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EMAIL_USER = process.env.EMAIL_USER;
const BASE_URL = process.env.FRONTEND_BASE_URL;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function enviarCorreoRestablecimiento(email, asunto, codigo) {
  try {
    //console.log("en funcion envio correo:", codigo);
    const resetUrl = `${BASE_URL}/password-recovery?code=${codigo}`;
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

    const contenido = `
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetUrl}">Restablecer mi contraseña</a>
        <p>Este enlace expirará en 1 hora.</p>
      `;
    const info = await transporter.sendMail({
      from: `"TeacherApp" <${EMAIL_USER}>`,
      to: email,
      subject: asunto,
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña:`,
      html: contenido,
    });
  } catch (error) {
    console.error("Error al enviar correo: ", error);
  }
}

module.exports = { enviarCorreoRestablecimiento };
