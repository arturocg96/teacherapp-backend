# Documentación - Usuarios

_X significa ninguno/nada_

## Endpoints

## Listar Usuario

- URL: `GET /api/usuarios`
- Body: X
- Headers: {
  "Content-Type": "application/json",
  "Authorization": token,
  }

- Descripción: Devuelve un listado de todos los usuarios registrados en el sistema.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la lista de usuarios.

---

### Obtener un Usuario por ID

- URL: `GET /api/usuarios/:id`,
- Body: X
- Headers: {
  "Content-Type": "application/json",
  "Authorization": token,
  }

- Descripción: Devuelve la información completa de un usuario, incluyendo sus datos de usuario.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la información del usuario.

---

### Registrar un Usuario (Ver documentación de Administrador)

- URL: `POST /api/usuarios/activar/:id`,
- Body: {
  activo: Boolean
  }
- Headers: {
  "Content-Type": "application/json",
  "Authorization": token,
  }

- Modifica un perfil activando un usuario determinado por el id en parámetros. El token debe ser de un usuario con rol administrador.
- Código: 200
- Contenido: JSON con un mensaje informando de la activación o desactivación de un usuario.
