# Documentación - Opiniones

_X significa ninguno/nada_

## Endpoints

## Listar Opiniones

- URL: `GET /api/opiniones`
- Body: X
- Headers: {
  "Content-Type": "application/json",
  "Authorization": token,
  }

- Descripción: Devuelve un listado de todas las opiniones registradas en el sistema.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la lista de opiniones.

---

### Obtener una Opinión por ID

- URL: `GET /api/opiniones/:idEstudiante/:idProfesor`
- Body: X
- Headers: {
  "Content-Type": "application/json",
  "Authorization": token,
  }

- Descripción: Devuelve la información completa de una opinión específica, identificada por el ID del estudiante y el ID del profesor.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la información de la opinión.

---

### Obtener Opiniones por ID de Profesor

- URL: `GET /api/opiniones/profesor/:id`
- Body: X
- Headers: {
  "Content-Type": "application/json",
  "Authorization": token,
  }

- Descripción: Devuelve todas las opiniones asociadas a un profesor específico.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la lista de opiniones del profesor.

---

### Obtener Opiniones por ID de Estudiante

- URL: `GET /api/opiniones/estudiante/:id`
- Body: X
- Headers: {
  "Content-Type": "application/json",
  "Authorization": token,
  }

- Descripción: Devuelve todas las opiniones realizadas por un estudiante específico.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la lista de opiniones del estudiante.

---

### Crear una Opinión

- URL: `POST /api/opiniones`
- Body: {
  profesor_id: Number,
  puntuacion: Number,
  comentario: String
  }
- Headers: {
  "Content-Type": "application/json",
  "Authorization": token,
  }

- Descripción: Permite a un estudiante crear una nueva opinión sobre un profesor, siempre que haya sido su alumno.
- Respuesta exitosa:

  - Código: 201
  - Contenido: JSON con la nueva opinión creada.

- Respuesta de error:
  - Código: 403
  - Contenido: JSON con un mensaje de error si el usuario no es un alumno o no ha sido alumno del profesor.

---

### Actualizar una Opinión

- URL: `PUT /api/opiniones/:idEstudiante/:idProfesor`
- Body: {
  puntuacion: Number,
  comentario: String
  }
- Headers: {
  "Content-Type": "application/json",
  "Authorization": token,
  }

- Descripción: Permite a un estudiante actualizar una opinión existente sobre un profesor.
- Respuesta exitosa:

  - Código: 200
  - Contenido: JSON con la opinión actualizada.

- Respuesta de error:
  - Código: 404
  - Contenido: JSON con un mensaje de error si la opinión no se encuentra.

---

### Eliminar una Opinión

- URL: `DELETE /api/opiniones/:idEstudiante/:idProfesor`
- Body: X
- Headers: {
  "Content-Type": "application/json",
  "Authorization": token,
  }

- Descripción: Permite a un estudiante eliminar una opinión existente sobre un profesor.
- Respuesta exitosa:

  - Código: 200
  - Contenido: JSON con un mensaje confirmando la eliminación de la opinión.

- Respuesta de error:
  - Código: 404
  - Contenido: JSON con un mensaje de error si la opinión no se encuentra.
