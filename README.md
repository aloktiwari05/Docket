# Docket — Modern Full-Stack Task & Workflow Management

A modern, responsive, and secure task management web application built with **React 19**, **Tailwind CSS v4**, **Node.js / Express**, and **PostgreSQL**. Docket helps users track daily tasks, organize upcoming deadlines, take quick notes, and monitor productivity with real-time feedback and toast notifications.

---

## Features

### 🔐 Authentication & Session Security
* **JWT Authentication:** Dual-token strategy with short-lived access tokens and secure, `HttpOnly`, `SameSite=None` refresh tokens.
* **Encrypted Passwords:** Passwords salted and hashed with `bcrypt`.
* **Silent Session Refresh:** Automatic background session renewal on app startup.
* **Protected Routes:** Route guards with smooth loading spinners and redirects.
* **Secure Logout:** Token revocation in database and cookie clearance across origins.

### 📋 Task Management
* **Full CRUD Operations:** Create, edit, inspect, and delete tasks with instant feedback.
* **Filter Tabs & Badges:** Categorize tasks by **All**, **Pending**, **Completed**, and **Overdue** with dynamic counts.
* **Interactive Status Toggles:** Check off tasks with one click on both desktop and mobile devices.
* **Real-time Task Search:** Fast, auto-completing search bar with instant dropdown previews and click-outside dismissal.
* **Task Details Modal:** Dedicated task view displaying priority, due date, description, and quick-action buttons.
* **Pagination:** Smart pagination with page truncation (`...`) for large collections of tasks.

### 📱 Responsive Design & UX
* **Mobile-First Layout:** Desktop persistent sidebar (`lg:flex`) paired with a mobile header and slide-over navigation drawer with backdrop blur.
* **Interactive Calendar:** Monthly view highlighting scheduled deadlines and daily tasks.
* **Quick Notes Scratchpad:** Lightweight idea/notes workspace with persistent local storage.
* **Account Settings & Profile:** Overview of user details, task completion metrics, and preference toggles.
* **Global Toast Notifications:** Real-time feedback for creation, updates, deletions, and network errors powered by `react-toastify`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 (`react`, `react-dom`) |
| **Build Tool & Bundler** | Vite 8 |
| **Routing** | React Router DOM v7 |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Icons** | Lucide React |
| **Notifications** | React Toastify |
| **Backend Runtime** | Node.js (ES Modules) |
| **Server Framework** | Express 5 |
| **Database** | PostgreSQL (`pg`) |
| **Auth & Security** | JSON Web Tokens (`jsonwebtoken`), `bcrypt`, `cookie-parser`, `cors` |
| **CI / CD** | GitHub Actions (`Task Manager CI`) |

---

## Project Structure

```
NewProject/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow (frontend build & backend syntax check)
├── backend/
│   ├── config/
│   │   └── db.js              # PostgreSQL pool connection configuration
│   ├── controllers/
│   │   ├── authController.js  # Signup, login, refresh token, user profile, logout
│   │   └── taskController.js  # CRUD operations, stats, search, and pagination
│   ├── middlewares/
│   │   └── authMiddleware.js  # Bearer token verification middleware
│   ├── routes/
│   │   ├── authRoutes.js      # /api/auth routes
│   │   └── taskRoutes.js      # /api/tasks routes
│   ├── utils/
│   │   └── authUtils.js       # JWT generation and cookie helpers
│   ├── dbQuery.sql            # Database schema and query definitions
│   ├── package.json           # Backend dependencies and scripts
│   └── server.js              # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── api/               # API base URL configuration
│   │   ├── components/        # Sidebar, TaskCard, TaskModal, Search, Modals, Pagination
│   │   ├── context/           # AuthContext and TaskContext providers
│   │   ├── pages/             # Dashboard, Tasks, Calendar, Notes, Profile, Settings, Auth
│   │   ├── routes/            # ProtectedRoutes wrapper
│   │   ├── services/          # Fetch API service layers (auth & tasks)
│   │   ├── App.jsx            # Layout wrapper (Sidebar + Outlet)
│   │   ├── index.css          # Tailwind CSS v4 imports
│   │   └── main.jsx           # React root, RouterProvider, and global ToastContainer
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend dependencies and scripts
│   └── vite.config.js         # Vite configuration with Tailwind CSS plugin
└── README.md
```

---

## Database Schema

Docket uses PostgreSQL. Initialize the database using the following SQL commands (also available in `backend/dbQuery.sql`):

```sql
CREATE DATABASE docket;

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    bio VARCHAR(255),
    password_hash TEXT NOT NULL,
    refresh_token TEXT UNIQUE
);

-- Tasks Table
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    priority VARCHAR(10) DEFAULT 'medium'
        CHECK (priority IN ('low', 'medium', 'high')),
    status VARCHAR(20) DEFAULT 'pending'
        CHECK (status IN ('pending', 'completed')),
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Environment Variables

### Backend (`backend/.env`)

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
ORIGIN=http://localhost:5173
NODE_ENV=development

# PostgreSQL Database Configuration
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=docket

# Authentication Secrets
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
```

### Frontend (`frontend/.env`)

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

---

## Getting Started

### Prerequisites
* **Node.js**: v18.x or v20+ recommended
* **npm** or **pnpm**
* **PostgreSQL**: Running instance with the database created

---

### Step 1: Clone Repository & Setup Backend

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the development server (uses nodemon)
npm run dev
```

The backend server will start on `http://localhost:5000`.

---

### Step 2: Setup Frontend

Open a new terminal window:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## API Reference

### Auth Endpoints (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user account | No |
| `POST` | `/api/auth/login` | Sign in with email or username | No |
| `POST` | `/api/auth/refresh` | Refresh access token using cookie | Refresh Cookie |
| `POST` | `/api/auth/logout` | Revoke token and clear session cookie | Refresh Cookie |
| `GET` | `/api/auth/getuser` | Fetch current user details | Bearer Token |

### Task Endpoints (`/api/tasks`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/tasks/new` | Create a new task | Bearer Token |
| `GET` | `/api/tasks/get?page=1` | Get paginated tasks for user | Bearer Token |
| `GET` | `/api/tasks/stats` | Get task counts (total, overdue, upcoming) | Bearer Token |
| `GET` | `/api/tasks/search?q=:query` | Search user tasks by keyword | Bearer Token |
| `PATCH` | `/api/tasks/update/:taskid` | Update task fields (status, title, etc.) | Bearer Token |
| `DELETE`| `/api/tasks/delete/:taskid` | Delete a task by ID | Bearer Token |

---

## Scripts & Commands

### Frontend (`frontend/`)
* `npm run dev` — Starts the Vite dev server with hot module replacement (HMR).
* `npm run build` — Compiles production assets into `dist/`.
* `npm run lint` — Runs ESLint checks.
* `npm run preview` — Locally previews the production build.

### Backend (`backend/`)
* `npm run dev` — Starts the backend server with `nodemon` for auto-restart.
* `npm start` — Runs the server with standard `node server.js`.

---

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "feat: add awesome feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## License

This project is licensed under the [ISC License](LICENSE).
