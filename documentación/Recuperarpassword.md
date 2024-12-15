# Documentación - Restablecimiento de Contraseñas

## Endpoint

### 1. `GET /api/recuperarclave/restablecermiclave/:code`

- Descripción: Verifica la validez del código de restablecimiento de contraseña enviado al usuario por correo electrónico.
- `:code`: Código único enviado al correo del usuario para restablecer su contraseña.
- Respuesta exitosa:
- Código: 200 Código válido.
- Código:401 Código inválido o expirado.

---

### 2.Enviar email `POST /api/recuperarclave/`

- Descripción: Enviar un correo electrónico al usuario para restablecer su contraseña.
- Body: Debe enviarse en formato `application/json` e incluir los siguientes campos:
  {
  `email`: email del usuario a recuperar pass
  }

### 2.Atualizar contraseña `POST /api/recuperarclave/restablecermiclave`

- Descripción: Enviar un correo electrónico al usuario para restablecer su contraseña.
- Body: Debe enviarse en formato `application/json` e incluir los siguientes campos:
  {  
   `codigo`: codigo que viene desde la url,
  `:nuevaContraseña`: nuevas contraseña de usuario.
  }
