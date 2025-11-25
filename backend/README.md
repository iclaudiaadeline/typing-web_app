# JFFT Backend API - Jackal Furious Finger Typing

Backend API for the Jackal Furious Finger Typing Web Application - A comprehensive typing practice and learning platform.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based auth with role-based access control (Student, Teacher, Admin, School Admin)
- **Typing Practice System**: Real-time progress tracking, adaptive difficulty, session management
- **Assignment Management**: Teachers can create, manage, and track student assignments
- **School & Class Management**: Multi-tenant support for educational institutions
- **Progress Analytics**: Comprehensive tracking of WPM, accuracy, error patterns
- **Gamification**: Achievements, leaderboards, and certification system
- **Voice Typing** (Premium): Speech-to-text practice with pronunciation analysis
- **Certificate Generation**: Digital certificates for skill milestones
- **RESTful API**: Well-structured, documented endpoints

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## 🛠️ Installation

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   ```bash
   cp .env.example .env
   ```

4. **Configure `.env` file** with your settings:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/jfft-db
   JWT_SECRET=your_secure_jwt_secret
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

6. **Run the server**:
   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

The API will be available at `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── typing.controller.js
│   │   ├── assignment.controller.js
│   │   ├── class.controller.js
│   │   ├── school.controller.js
│   │   ├── progress.controller.js
│   │   ├── certificate.controller.js
│   │   ├── achievement.controller.js
│   │   ├── leaderboard.controller.js
│   │   └── voice.controller.js
│   │
│   ├── models/            # Database schemas
│   │   ├── User.model.js
│   │   ├── School.model.js
│   │   ├── Class.model.js
│   │   ├── Assignment.model.js
│   │   ├── Progress.model.js
│   │   ├── Certificate.model.js
│   │   ├── Achievement.model.js
│   │   └── VoiceSession.model.js
│   │
│   ├── routes/            # API routes
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── typing.routes.js
│   │   ├── assignment.routes.js
│   │   ├── class.routes.js
│   │   ├── school.routes.js
│   │   ├── progress.routes.js
│   │   ├── certificate.routes.js
│   │   ├── achievement.routes.js
│   │   ├── leaderboard.routes.js
│   │   └── voice.routes.js
│   │
│   ├── middleware/        # Custom middleware
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── utils/             # Utility functions
│   │   └── jwt.utils.js
│   │
│   └── server.js          # Application entry point
│
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user
- `PUT /profile` - Update profile
- `PUT /password` - Change password
- `POST /refresh` - Refresh access token
- `POST /logout` - Logout user

### Users (`/api/users`)
- `GET /` - Get all users (Admin)
- `GET /:id` - Get user by ID
- `PUT /settings` - Update user settings
- `GET /:id/stats` - Get user statistics
- `DELETE /:id` - Delete user (Admin)

### Typing Practice (`/api/typing`)
- `POST /start` - Start typing session
- `POST /submit` - Submit typing session results
- `GET /texts` - Get practice texts
- `GET /progress` - Get user progress history

### Assignments (`/api/assignments`)
- `POST /` - Create assignment (Teacher)
- `GET /` - Get all assignments
- `GET /:id` - Get assignment by ID
- `PUT /:id` - Update assignment (Teacher)
- `DELETE /:id` - Delete assignment (Teacher)
- `GET /:id/student-stats` - Get student statistics (Teacher)

### Classes (`/api/classes`)
- `POST /` - Create class (Teacher)
- `GET /` - Get all classes
- `GET /:id` - Get class by ID
- `PUT /:id` - Update class (Teacher)
- `POST /:id/students` - Add students to class (Teacher)
- `DELETE /:id/students/:studentId` - Remove student (Teacher)
- `DELETE /:id` - Delete class (Teacher)

### Schools (`/api/schools`)
- `POST /` - Create school (Admin)
- `GET /` - Get all schools
- `GET /:id` - Get school by ID

### Progress (`/api/progress`)
- `GET /:userId` - Get user progress

### Certificates (`/api/certificates`)
- `POST /` - Generate certificate
- `GET /my-certificates` - Get user certificates
- `GET /verify/:certificateId` - Verify certificate

### Achievements (`/api/achievements`)
- `GET /` - Get all achievements
- `POST /check` - Check and award achievements

### Leaderboard (`/api/leaderboard`)
- `GET /` - Get leaderboard

### Voice Typing (`/api/voice`) (Premium Feature)
- `POST /process` - Process voice typing
- `GET /sessions` - Get voice sessions

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 👥 User Roles

- **Student**: Can practice typing, view assignments, track progress
- **Teacher**: Can create classes, assignments, view student progress
- **School Admin**: Manages school, teachers, and students
- **Admin**: Full system access

## 🗄️ Database Models

### User
- Personal information
- Authentication credentials
- Typing statistics
- Subscription status
- Settings and preferences

### School
- School information
- Admin, teachers, students
- Subscription plan
- Settings

### Class
- Class details
- Teacher and students
- Assignments
- Schedule

### Assignment
- Title, description, typing text
- Goals (WPM, accuracy targets)
- Due date
- Student progress tracking

### Progress
- Session metrics (WPM, accuracy)
- Error analysis
- Timestamp information

### Certificate
- Certificate details
- User metrics
- Verification ID

### Achievement
- Achievement criteria
- Points and rarity
- Category

### VoiceSession (Premium)
- Voice analysis results
- Pronunciation scores
- Error tracking

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_very_secure_random_secret_key
FRONTEND_URL=https://your-frontend-domain.com
```

### Deployment Platforms
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **Render**: Connect GitHub repo
- **DigitalOcean**: Use App Platform

## 🧪 Testing

```bash
# Run tests (to be implemented)
npm test
```

## 📝 API Response Format

### Success Response
```json
{
  "status": "success",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error message here"
}
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

Copyright © 2025 Jackal Tech Ltd. All rights reserved.

## 📧 Contact

- **Email**: info@jackaltechltd.com
- **Website**: www.jackaltechltd.com

---

Built with ❤️ by Jackal Tech Ltd
