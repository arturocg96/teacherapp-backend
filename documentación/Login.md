# Documentación - Login

## Endpoint

### Hacer login contra la BD de usuarios

- URL: `POST /api/login`
- Descripción: Comprueba el email y la contraseña y si existen y son correctos crea el token y lo devuelve.
- Body: Debe enviarse en formato `application/json`. Incluye los campos:
  - `email`: Correo electrónico del usuario.
  - `password`: Password del usuario.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON 
    {
    "message": "Login correcto",
    "token": token generado para la sesión del usuario logado.
    } 

- Respuesta no exitosa:
  - Código; 401
  Contenido: JSON
    {
    "message": "Error en email y/o contraseña"
    }