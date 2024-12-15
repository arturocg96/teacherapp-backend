# Documentación - Profesores

## Endpoints

## Listar Profesores

- URL: `GET /api/profesores`
- Descripción: Devuelve un listado de todos los profesores registrados en el sistema.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la lista de profesores.

---

### Obtener un Profesor por ID

- URL: `GET /api/profesores/:id`
- Descripción: Devuelve la información completa de un profesor, incluyendo sus datos de usuario y las materias asignadas.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la información del profesor.

---

### Registrar un Nuevo Profesor

- URL: `POST /api/profesores/registro`
- Descripción: Registra un nuevo profesor con sus datos de usuario, detalles específicos de profesor y materias asignadas. Además, envía automáticamente una notificación por correo electrónico a los administradores activos para informarles del nuevo registro y solicitar que validen el perfil del profesor en la plataforma.
- Body: Debe enviarse en formato `multipart/form-data` para incluir posibles archivos (como foto de perfil). Campos:
  - `usuario`: Información del usuario (nombre, email, etc.).
  - `profesor`: Detalles específicos del profesor.
  - `materias`: Lista de materias asignadas.
  - `foto`: Archivo de imagen para la foto del profesor (opcional).
- Respuesta exitosa:
  - Código: 201
  - Contenido: JSON con los datos del profesor recién creado.


### Actualizar un Profesor Existente

- URL: `PUT /api/profesores/:id`
- Descripción: Actualiza los datos de un profesor existente, incluyendo la actualización de materias asignadas.
- Middlewares:
  - `checkToken`: Verifica que el usuario esté autenticado mediante un token válido.
  - `checkUsuarioById`: Verifica que el usuario autenticado tiene el mismo ID que el profesor que se desea actualizar.
- Body: Debe enviarse en formato `multipart/form-data` para permitir la actualización de archivos. Incluye los campos:
  - `usuario`: Información del usuario actualizada.
  - `profesor`: Detalles específicos del profesor.
  - `materias`: Lista actualizada de materias asignadas.
  - `foto`: Archivo de imagen para la foto del profesor (opcional).
- Respuestas:
  - Exitosa:
    - Código: 200
    - Contenido: JSON con los datos actualizados del profesor.
  - Error:
    - Código: 404
      - Profesor no encontrado.
    - Código: 403
      - No autorizado para realizar esta acción.
    - Código: 500
      - Error al actualizar los datos del profesor.



