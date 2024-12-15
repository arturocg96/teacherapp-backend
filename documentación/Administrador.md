# Documentación - Administración de Alumnos y Profesores

## Endpoints

### Activar o Desactivar un Usuario

- URL: `PUT /api/usuarios/activar/:id`
- Descripción: Activa o desactiva un usuario (baja lógica) basado en el valor booleano de `activo`.
- Middlewares:
  - `checkToken`: Verifica que el usuario esté autenticado mediante un token válido.
  - `checkRolAdministrador`: Verifica que el usuario autenticado tenga el rol de administrador.
- Parámetros:
  - `id`: ID del usuario a activar o desactivar, ubicado al final de la ruta.
- Body:
  - `activo`: Booleano; `true` para activar y `false` para desactivar.
- Respuestas:
  - Exitosa:
    - Código: 200
    - Contenido: Estado actualizado del usuario.
  - Error:
    - Código: 404
      - Usuario no encontrado.
    - Código: 500
      - Error al actualizar el estado del usuario.

### Validar o Desvalidar un Profesor

- URL: `PUT /api/profesores/validar/:id`
- Descripción: Valida o desvalida un profesor, basado en el valor booleano de `validado`.
- Middlewares:
  - `checkToken`: Verifica que el usuario esté autenticado mediante un token válido.
  - `checkRolAdministrador`: Verifica que el usuario autenticado tenga el rol de administrador.
- Parámetros:
  - `id`: ID del profesor a validar o desvalidar, ubicado al final de la ruta.
- Body:
  - `validado`: Booleano; `true` para validar y `false` para desvalidar.
- Respuestas:
  - Exitosa:
    - Código: 200
    - Contenido: Estado de validación actualizado del profesor.
  - Error:
    - Código: 404
      - Profesor no encontrado.
    - Código: 500
      - Error al actualizar la validación del profesor.
