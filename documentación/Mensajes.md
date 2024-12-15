# Documentación - mensajes

## Endpoints

### Obtener mensajes no leídos de un usuario.

- URL: `GET /api/mensajes/:userid`
- Descripción: Devuelve una lista de mensajes no leídos para el usuario especificado.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la lista de mensajes no leídos.

### Listar alumnos inscritos a un profesor

- URL: `GET /api/mensajes/misalumnos/:userid`
- Descripción: Devuelve una lista de los alumnos inscritos al profesor en especifico.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la lista de alumnos asociados.

### Listar profesores de un alumno.

- URL: `GET /api/mensajes/misprofesores/:userid`
- Descripción: Devuelve una lista de los profesores asociados al alumno en especifico.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la lista de profesores de un alumno.

### Obtener mensajes entre 2 usurios.

- URL: `GET /api/mensajes/:emisor_id/:destinatario_id`
- Descripción: Devuelve una lista de mensajes enviados y recibidos entre dos usuarios.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la lista de mensajes comunes entre emisor_id y destinatario_id.

### Enviar un mensaje a otro usuario.

- URL: `POST /api/mensajes/enviar`
  Descripción: Permite que un usuario envíe un mensaje a otro usuario registrado en la aplicación.

- Body: Debe enviarse en formato `application/json`. Incluye los campos:
  `emisor_id`: ID del usuario que envía el mensaje.
  `destinatario_id`: ID del usuario que recibe el mensaje.
  `asunto`: asunto.
  `contenido`: Texto del mensaje.
- Respuesta exitosa:
- Contenido: JSON con datos del mensaje

### Marcar leido.

- URL: `PATCH /api/mensajes/:msjid`
- Descripción: Marca un mensaje como leído.
- Body: Debe enviarse en formato `application/json` e incluir los siguientes campos:
  `leido`: estado del mensaje a (1 para leido).
- Respuesta exitosa:
  - Código: 200
  - Contenido: Confirmación de la actualización.
