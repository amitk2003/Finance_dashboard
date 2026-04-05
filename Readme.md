# Finance Data Processing and Access Control Backend

A robust, logically structured backend built for a finance dashboard system. Evaluates API design, data modeling, role-based access control, and advanced functionalities like pagination, smart searching, and rate-limiting.

## 🚀 Features

- **Role-Based Access Control (RBAC):** Distinct privileges for `Viewer`, `Analyst`, and `Admin` users enforced via custom middlewares.
- **JWT Authentication:** Secure user sessions and password hashing utilizing `bcryptjs` and `jsonwebtoken`.
- **Advanced Querying:** Supports Pagination, and `$regex` keyword searching on records.
- **Enhanced Security features:** Integrated `express-rate-limit` to prevent brute force and DDoS attacks.
- **Soft Deletion:** Records are flagged as deleted (`isDeleted`) preserving database integrity instead of executing destructive queries.
- **Dashboard Aggregation:** Optimized custom endpoints providing dynamic computations (Net balance, Income totals, Recent History).
- **Interactive Documentation:** Seamless Swagger UI implementation accessible via `/api-docs`.

## 🛠 Tech Stack 

- **Node.js** + **Express.js** (API Framework using modern ES Modules)
- **MongoDB** + **Mongoose** (Database & ORM)
- **Swagger UI** (API Documentation)

## 📦 Setup & Installation

**1. Clone and Install Dependencies:**
```bash
npm install
```

**2. Environment Variables:**
Create a `.env` file in the root directory utilizing `.env.example` as a template:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=5d
```

**3. Run the Development Server:**
```bash
npm run dev
```

## 🏗 API Architecture

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate & obtain JWT

### Records (Protected via JWT & Roles)
- `GET /api/records` - Retrieve paginated records (Allows `?page=1&limit=10&search=keyword`)
- `POST /api/records` - Create a new record 
- `DELETE /api/records/:id` - Soft delete a record 

### Dashboard Analytics 
- `GET /api/dashboard/summary` - Fetch computed net records, expenses, and category aggregates

### Interactive Swagger Docs
Open `http://localhost:8000/api-docs` after starting the server!

## 🌍 Deployment Strategy

This application is completely production-ready and built stateless so it can be deployed to modern PaaS providers. 

**Recommended Platforms:**
- **Render.com** or **Railway.app** for the Node Web Service.
- **MongoDB Atlas** for the Database.

**Deployment Steps:**
1. Connect your GitHub repository to your Render/Railway dashboard.
2. Set your build command to `npm install`.
3. Set your start command to `npm start` (or `node server.js`).
4. Critically: Add your Environment Variables (`MONGO_URI`, `JWT_SECRET`, `PORT`) natively inside your hosting provider's dashboard configuration and deploy!

## 🧠 Assumptions & Tradeoffs 

1. **Soft Delete vs Hard Delete:** Implemented soft deletion over hard deletion to prevent accidental permanent financial un-tracking while adding slight overhead to aggregation query filtering logic.
2. **Stateless JWTs:** Chosen over Session cookies for simpler cross-origin compatibility mapping, anticipating the frontend might exist on an entirely independent domain architecture.
3. **Regex Searching:** Utilized database-level regex string-matching to prevent heavy application-memory load.
