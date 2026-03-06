#  JFFT - Jackal Furious Finger Typing Web Application




##  Quick Start

### Automated Setup (Recommended)

```powershell
# Run the automated setup script
.\setup.ps1
```

### Manual Setup

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ..
npm install

# Configure environment
cd backend
cp .env.example .env
# Edit .env with your settings

# Start backend (Terminal 1)
npm run dev

# Start frontend (Terminal 2)
cd ..
npm run dev
```

Visit `http://localhost:5173` 🎉

---

##  Features

###  Core Features
-  **Real-Time Typing Practice** - Character-by-character feedback with live statistics
-  **Virtual Keyboard** - Visual guidance with key highlighting
-  **Progress Tracking** - Comprehensive WPM, accuracy, and error analysis
-  **Assignment System** - Teachers create and track student assignments
-  **School Management** - Multi-tenant support for institutions

###  Gamification
-  **Achievements** - Earn badges across 5 categories with 4 rarity levels
-  **Leaderboards** - Global and school rankings for WPM and accuracy
-  **Certificates** - Digital certificates for 5 proficiency levels
-  **Points System** - Reward-based progression

###  Premium Features
-  **Voice Typing** - Speech-to-text practice with pronunciation analysis
-  **Advanced Analytics** - Detailed performance insights
-  **Custom Texts** - Upload your own practice materials

###  User Roles
- **Students** - Practice typing, view assignments, track progress
- **Teachers** - Create classes, manage assignments, view student reports
- **School Admin** - Manage school, teachers, and students
- **System Admin** - Full platform access

---

##  Project Structure

```
Typing Web Application/
├──  backend/              # Node.js + Express API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth & error handling
│   │   └── server.js       # Entry point
│   └── README.md
│
├──  src/                  # React + TypeScript Frontend
│   ├── components/         # Reusable components
│   │   ├── ui/            # shadcn/ui components (40+)
│   │   └── ...
│   ├── pages/             # Page components (13)
│   │   ├── Dashboard.tsx
│   │   ├── TypingPractice.tsx
│   │   ├── Achievements.tsx
│   │   ├── Leaderboard.tsx
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   └── App.tsx
│


---

##  Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui (40+ components)
- **Styling**: Tailwind CSS
- **State**: React Query (TanStack)
- **Routing**: React Router v6

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator

### Additional
- **Voice API**: Google Cloud Speech-to-Text (Ready)
- **PDF Generation**: PDFKit (Ready)
- **Email**: Nodemailer (Ready)

---

##  Documentation

---

##  Key Features Showcase

### Typing Practice Interface
```
✓ Real-time WPM calculation
✓ Live accuracy tracking  
✓ Error highlighting
✓ Virtual keyboard guidance
✓ Progress bar
✓ Completion statistics
```

### School Management
```
✓ Multi-tenant architecture
✓ Class management
✓ Student enrollment
✓ Assignment tracking
✓ Progress reporting
```

### Gamification
```
✓ 6 Achievement categories
✓ 4 Rarity levels
✓ Global leaderboard
✓ 5 Certificate levels
✓ Points system
```

---

##  Deployment

### Frontend (Vercel - Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```




---

##  Security Features

-  JWT Authentication
-  Password Hashing (bcrypt)
-  Role-Based Access Control
-  Rate Limiting (100 req/15min)
-  CORS Protection
-  Helmet Security Headers
-  Input Validation
-  XSS Protection

---

##  Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest |  Supported |
| Firefox | Latest |  Supported |
| Safari | Latest |  Supported |
| Edge | Latest |  Supported |
| Mobile | iOS/Android |  Supported |

---

##  Testing

```bash
# Frontend tests (to be implemented)
npm test

# Backend tests (to be implemented)
cd backend && npm test

# E2E tests (to be implemented)
npm run test:e2e
```

---

##  Project Statistics

- **Total Files**: 100+
- **Lines of Code**: 15,000+
- **Components**: 50+
- **API Endpoints**: 40+
- **Database Models**: 8
- **Pages**: 13
- **Features**: 60+

---

##  What You'll Learn

This project demonstrates:
-  Full-stack web development
-  RESTful API design
-  MongoDB database modeling
-  JWT authentication
-  React state management
-  TypeScript usage
-  Responsive UI design
-  Security best practices
-  Git version control
-  Deployment strategies

---

## Roadmap

### Phase 1: Complete 
- Core typing practice
- User authentication
- School management
- Gamification system
- Voice typing UI

### Phase 2: In Progress 
- [ ] Google Speech API integration
- [ ] PDF certificate generation
- [ ] Email notifications
- [ ] Social login
- [ ] Password reset

### Phase 3: Planned 
- [ ] Real-time multiplayer races
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Parent portal
- [ ] LMS integration

---

##  Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

##  Support & Contact

**Jackal Tech Ltd**
-  Email: info@jackaltechltd.com
-  Website: www.jackaltechltd.com
-  Documentation: See docs folder
-  Issues: Create a GitHub issue

---

##  License

Copyright © 2025 Jackal Tech Ltd. All rights reserved.

---

##  Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [React](https://react.dev/) - UI framework
- [Express](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database

---

