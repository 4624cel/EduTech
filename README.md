# EduTech API

REST API for managing an educational platform. It allows you to manage students, teachers, and subjects with JWT-based authentication and persistence in MongoDB Atlas.

---

## Technologies

- **Node.js** with Express 5  
- **MongoDB Atlas** with Mongoose  
- **JWT** for authentication  
- **bcryptjs** for password encryption  
- **Swagger UI** for interactive documentation 

---

## Project Structure

```
EduTech/
├── src/
│   ├── Config/
│   │   ├── BD_conexion.js       # MongoDB Atlas connection
│   │   └── swagger.js           # Swagger configuration
│   ├── Controllers/
│   │   ├── authController.js    # Registration and login
│   │   ├── studentController.js
│   │   ├── teacherController.js
│   │   └── subjectController.js
│   ├── Helpers/
│   │   └── Token.js             # JWT generation and verification
│   ├── Middlewares/
│   │   └── Auth.js              # Authentication middleware
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

## Installation

### Prerequisites

- Node.js v18 or higher  
- Account on [MongoDB Atlas](https://www.mongodb.com/atlas)

### Steps

1. Clone the repository:

```bash
git clone https://github.com/4624cel/EduTech.git
cd EduTech
```

2. Install dependencies:

```bash
npm install
```

3. Create the .env file in the project root with the following variables:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_secret_key
```

4. Start the server:

```bash
node index.js
```

The server will be running at `http://localhost:3000`.

---

## Documentación

Documentation

The API includes interactive documentation generated with Swagger. Once the server is running, access:

```
http://localhost:3000/api-docs
```

From there, you can explore and test all endpoints directly in the browser.

---

## Authentication

The system automatically detects the user role based on the email format:

| Email format | Assigned role |
|---|---|
| `st` + números + `@domain` | `student` |
| `th` + números + `@domain` | `teacher` |

Example: `st12345@edu.com` → student, `th001@edu.com` → teacher.

### Authentication flow

1. Register at `POST /api/auth/signup`
2. Log in at `POST /api/auth/login` and obtain the JWT token
3. Include the token in the header of each protected request:

```
Authorization: Bearer <token>
```

The token is valid for **1 hour**.

---

## Endpoints

### Auth — `/api/auth`

| Method | Route | Description | Requires token |
|---|---|---|---|
| POST | `/signup` | Register a new user | No |
| POST | `/login` | Log in and obtain JWT | No |

### Students — `/api`

| Method | Route | Description | Requires token |
|---|---|---|---|
| GET | `/getAllStudents` | Get all students | Yes |
| GET | `/getStudent/:ID` | Get a student by ID | Yes |
| POST | `/createStudent` | Create a student | Yes |
| PUT | `/updateStudent/:ID` | Update a student | Yes |
| DELETE | `/deleteStudent/:ID` | Delete a student | Yes |

### Teachers — `/api`

| Method | Route | Description | Requires token |
|---|---|---|---|
| GET | `/getAllTeachers` | Get all teachers | Yes |
| GET | `/getTeacher/:ID` | Get a teacher by ID | Yes |
| POST | `/createTeacher` | Create a teacher | Yes |
| PUT | `/updateTeacher/:ID` | Update a teacher | Yes |
| DELETE | `/deleteTeacher/:ID` | Delete a teacher | Yes |

### Subjects — `/api`

| Method | Route | Description | Requires token |
|---|---|---|---|
| GET | `/getAllSubjects` | Get all subjects | Yes |
| GET | `/getSubject/:ID` | Get a subject by ID | Yes |
| POST | `/createSubject` | Create a subject | Yes |
| PUT | `/updateSubject/:ID` | Update a subject | Yes |
| DELETE | `/deleteSubject/:ID` | Delete a subject | Yes |

---

## Usage Examples

### Register a student

```http
POST /api/auth/signup
Content-Type: application/json

{
  "Name": "Juan Pérez",
  "Email": "st12345@edu.com",
  "Password": "miPassword123"
}
```

### Log in

```http
POST /api/auth/login
Content-Type: application/json

{
  "Email": "st12345@edu.com",
  "Password": "miPassword123"
}
```

Response:
If it is a admin

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Create a subject

```http
POST /api/createSubject
Authorization: Bearer <token>
Content-Type: application/json

{
  "ID": "MAT101",
  "Name": "English",
  "Teacher": "th001"
}
```

> The Teacher field receives the teacher's custom ID, not the MongoDB _id.

### Create a student with subjects

```http
POST /api/createStudent
Authorization: Bearer <token>
Content-Type: application/json

{
  "ID": "12345",
  "Name": "Juan Pérez",
  "Email": "st12345@edu.com",
  "Subjects": ["Mathematics", "History"]
}
```

> The Subjects field receives names of existing subjects. The system automatically resolves them to their internal IDs and returns the names of the assigned teachers.

---

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port where the server runs (default: 3000) |
| `MONGO_URI` | MongoDB Atlas connection URI |
| `JWT_SECRET` | Secret key to sign JWT tokens |
