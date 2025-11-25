# JFFT - Quick Reference Card

## 🚀 Commands

### Setup
```bash
# Automated setup
.\setup.ps1

# Backend
cd backend && npm install && npm run dev

# Frontend  
npm install && npm run dev
```

### Development
```bash
# Start backend (Terminal 1)
cd backend && npm run dev          # http://localhost:5000

# Start frontend (Terminal 2)
npm run dev                        # http://localhost:5173

# Build for production
npm run build
```

---

## 📡 API Endpoints (localhost:5000/api)

### Authentication
```
POST   /auth/register          Register new user
POST   /auth/login            Login user
GET    /auth/me               Get current user
PUT    /auth/profile          Update profile
PUT    /auth/password         Change password
POST   /auth/logout           Logout
```

### Typing
```
POST   /typing/start          Start session
POST   /typing/submit         Submit results
GET    /typing/texts          Get practice texts
GET    /typing/progress       Get history
```

### Assignments
```
POST   /assignments           Create assignment
GET    /assignments           Get all assignments
GET    /assignments/:id       Get assignment
PUT    /assignments/:id       Update assignment
DELETE /assignments/:id       Delete assignment
```

### Leaderboard & Gamification
```
GET    /leaderboard           Get rankings
GET    /achievements          Get achievements
GET    /certificates          Get certificates
POST   /certificates          Generate certificate
```

---

## 🎯 Frontend Routes

```
/                            Landing page
/signup                      Sign up
/login                       Login
/dashboard                   Main dashboard
/dashboard/practice          Typing practice
/dashboard/assignments       View assignments
/dashboard/classes           Class management
/dashboard/students          Student overview
/dashboard/leaderboard       Rankings
/dashboard/achievements      Badges & rewards
/dashboard/certificates      Digital certificates
/dashboard/voice             Voice typing (Premium)
/dashboard/settings          User settings
```

---

## 🔐 Default Test Account

```
Email: student@test.com
Password: student123
```

---

## 🛠️ Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jfft-db
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📊 Database Collections

```
users               User accounts & stats
schools             School information
classes             Classroom data
assignments         Typing assignments
progress            Session history
certificates        Digital certificates
achievements        Badge definitions
voicesessions       Voice typing records
```

---

## 🎨 Key Components

### Frontend
```
DashboardLayout      Main layout with sidebar
TypingKeyboard       Virtual keyboard
Features             Landing page features
Navigation           Top navigation bar
```

### Backend
```
User.model           User schema
auth.controller      Authentication logic
typing.controller    Typing session handler
protect              Auth middleware
errorHandler         Error handling
```

---

## 🚨 Common Issues

### MongoDB Connection Error
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jfft
```

### Port Already in Use
```powershell
# Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Error
```javascript
// backend/server.js
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

---

## 📦 Key Dependencies

### Frontend
```json
{
  "react": "^18.3.1",
  "typescript": "^5.6.2",
  "tailwindcss": "^3.4.1",
  "@tanstack/react-query": "^5.83.0",
  "react-router-dom": "^7.1.3"
}
```

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5"
}
```

---

## 🎯 User Roles & Permissions

| Role | Practice | View Assignments | Create Assignments | Manage School |
|------|----------|-----------------|-------------------|---------------|
| Student | ✅ | ✅ | ❌ | ❌ |
| Teacher | ✅ | ✅ | ✅ | ❌ |
| School Admin | ✅ | ✅ | ✅ | ✅ |
| System Admin | ✅ | ✅ | ✅ | ✅ |

---

## 📈 Achievement Categories

```
Speed         Reach WPM milestones
Accuracy      Maintain high accuracy
Consistency   Practice regularly
Milestone     Complete sessions
Special       Unique achievements
```

---

## 🎓 Certificate Levels

```
Beginner      30+ WPM, 85%+ accuracy
Intermediate  50+ WPM, 90%+ accuracy
Advanced      75+ WPM, 95%+ accuracy
Expert        90+ WPM, 97%+ accuracy
Master        100+ WPM, 98%+ accuracy
```

---

## 🔧 Useful Scripts

### Reset Database
```javascript
// In MongoDB shell
use jfft-db
db.dropDatabase()
```

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Check API Health
```bash
curl http://localhost:5000/health
```

---

## 📚 Documentation Files

```
README.md              Project overview
INSTALLATION.md        Setup guide
COMPLETE_GUIDE.md      Full documentation
API_INTEGRATION.md     Frontend-Backend connection
PROJECT_SUMMARY.md     Feature summary
backend/README.md      Backend API docs
```

---

## 🚀 Deployment Checklist

- [ ] Configure environment variables
- [ ] Set up MongoDB Atlas
- [ ] Deploy backend to Railway/Heroku
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Test production endpoints
- [ ] Configure custom domain (optional)
- [ ] Enable HTTPS
- [ ] Set up monitoring

---

## 💡 Tips

1. **Use MongoDB Atlas** for easier database management
2. **Enable hot reload** during development
3. **Check browser console** for frontend errors
4. **Use Postman/Thunder Client** to test API
5. **Read error messages** carefully
6. **Keep environment variables secure**
7. **Use Git branches** for new features

---

## 📞 Quick Links

- GitHub: [Repository URL]
- Backend: http://localhost:5000
- Frontend: http://localhost:5173
- API Docs: http://localhost:5000/api
- MongoDB Atlas: https://mongodb.com/cloud/atlas
- Vercel: https://vercel.com
- Railway: https://railway.app

---

**Need more help?**
📖 Read COMPLETE_GUIDE.md
🐛 Create a GitHub issue
📧 Email: info@jackaltechltd.com
