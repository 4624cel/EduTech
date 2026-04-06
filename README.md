# EduTech API

REST API para la gestión de una plataforma educativa. Permite administrar estudiantes, maestros y materias con autenticación basada en JWT y persistencia en MongoDB Atlas.

---

## Tecnologías

- **Node.js** con Express 5
- **MongoDB Atlas** con Mongoose
- **JWT** para autenticación
- **bcryptjs** para encriptación de contraseñas
- **Swagger UI** para documentación interactiva

---

## Estructura del proyecto

```
EduTech/
├── src/
│   ├── Config/
│   │   ├── BD_conexion.js       # Conexión a MongoDB Atlas
│   │   └── swagger.js           # Configuración de Swagger
│   ├── Controllers/
│   │   ├── authController.js    # Registro y login
│   │   ├── studentController.js
│   │   ├── teacherController.js
│   │   └── subjectController.js
│   ├── Helpers/
│   │   └── Token.js             # Generación y verificación de JWT
│   ├── Middlewares/
│   │   └── Auth.js              # Middleware de autenticación
│   ├── Models/
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   └── Subject.js
│   └── Routes/
│       ├── auth.js
│       ├── studentRoutes.js
│       ├── teacherRoutes.js
│       └── subjectRoutes.js
├── index.js
├── package.json
└── .env
```

---

## Instalación

### Prerrequisitos

- Node.js v18 o superior
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)

### Pasos

1. Clona el repositorio:

```bash
git clone https://github.com/4624cel/EduTech.git
cd EduTech
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea el archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/<dbname>
JWT_SECRET=tu_clave_secreta
```

4. Inicia el servidor:

```bash
node index.js
```

El servidor estará corriendo en `http://localhost:3000`.

---

## Documentación

La API cuenta con documentación interactiva generada con Swagger. Una vez que el servidor esté corriendo, accede a:

```
http://localhost:3000/api-docs
```

Desde ahí puedes explorar y probar todos los endpoints directamente en el navegador.

---

## Autenticación

El sistema detecta el rol del usuario automáticamente a partir del formato del correo electrónico:

| Formato del correo | Rol asignado |
|---|---|
| `st` + números + `@dominio` | `student` |
| `th` + números + `@dominio` | `teacher` |

Ejemplo: `st12345@edu.com` → estudiante, `th001@edu.com` → maestro.

### Flujo de autenticación

1. Regístrate en `POST /api/auth/signup`
2. Inicia sesión en `POST /api/auth/login` y obtén el token JWT
3. Incluye el token en el header de cada petición protegida:

```
Authorization: Bearer <token>
```

El token tiene una validez de **1 hora**.

---

## Endpoints

### Auth — `/api/auth`

| Método | Ruta | Descripción | Requiere token |
|---|---|---|---|
| POST | `/signup` | Registrar un nuevo usuario | No |
| POST | `/login` | Iniciar sesión y obtener JWT | No |

### Students — `/api`

| Método | Ruta | Descripción | Requiere token |
|---|---|---|---|
| GET | `/getAllStudents` | Obtener todos los estudiantes | Sí |
| GET | `/getStudent/:ID` | Obtener un estudiante por ID | Sí |
| POST | `/createStudent` | Crear un estudiante | Sí |
| PUT | `/updateStudent/:ID` | Actualizar un estudiante | Sí |
| DELETE | `/deleteStudent/:ID` | Eliminar un estudiante | Sí |

### Teachers — `/api`

| Método | Ruta | Descripción | Requiere token |
|---|---|---|---|
| GET | `/getAllTeachers` | Obtener todos los maestros | Sí |
| GET | `/getTeacher/:ID` | Obtener un maestro por ID | Sí |
| POST | `/createTeacher` | Crear un maestro | Sí |
| PUT | `/updateTeacher/:ID` | Actualizar un maestro | Sí |
| DELETE | `/deleteTeacher/:ID` | Eliminar un maestro | Sí |

### Subjects — `/api`

| Método | Ruta | Descripción | Requiere token |
|---|---|---|---|
| GET | `/getAllSubjects` | Obtener todas las materias | Sí |
| GET | `/getSubject/:ID` | Obtener una materia por ID | Sí |
| POST | `/createSubject` | Crear una materia | Sí |
| PUT | `/updateSubject/:ID` | Actualizar una materia | Sí |
| DELETE | `/deleteSubject/:ID` | Eliminar una materia | Sí |

---

## Ejemplos de uso

### Registrar un estudiante

```http
POST /api/auth/signup
Content-Type: application/json

{
  "Name": "Juan Pérez",
  "Email": "st12345@edu.com",
  "Password": "miPassword123"
}
```

### Iniciar sesión

```http
POST /api/auth/login
Content-Type: application/json

{
  "Email": "st12345@edu.com",
  "Password": "miPassword123"
}
```

Respuesta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Crear una materia

```http
POST /api/createSubject
Authorization: Bearer <token>
Content-Type: application/json

{
  "ID": "MAT101",
  "Name": "Matemáticas",
  "Teacher": "th001"
}
```

> El campo `Teacher` recibe el ID personalizado del maestro, no el `_id` de MongoDB.

### Crear un estudiante con materias

```http
POST /api/createStudent
Authorization: Bearer <token>
Content-Type: application/json

{
  "ID": "12345",
  "Name": "Juan Pérez",
  "Email": "st12345@edu.com",
  "Subjects": ["Matemáticas", "Historia"]
}
```

> El campo `Subjects` recibe nombres de materias existentes. El sistema los resuelve automáticamente a sus IDs internos y retorna los nombres de los maestros asignados.

---

## Variables de entorno

| Variable | Descripción |
|---|---|
| `PORT` | Puerto en el que corre el servidor (default: 3000) |
| `MONGO_URI` | URI de conexión a MongoDB Atlas |
| `JWT_SECRET` | Clave secreta para firmar los tokens JWT |
