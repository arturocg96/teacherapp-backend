# Documentación - Materias

## Endpoints

### Obtener Todas las Materias

- URL: `GET /api/materias`
- Descripción: Devuelve una lista de todas las materias disponibles.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con una lista de objetos de materias, cada uno con su `id` y `nombre`.

### Obtener Materias Asignadas a un Profesor

- URL: `GET /api/materias/profesor-materias/:profesorId`
- Descripción: Devuelve una lista de las materias asignadas a un profesor específico, identificadas por el `profesorId`.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con una lista de objetos de materias asignadas al profesor, cada uno con su `id` y `nombre`.
