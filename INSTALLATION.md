# JFFT Web Application - Installation & Setup

## Quick Start (5 minutes)

### Step 1: Install Dependencies

#### Backend
```powershell
cd backend
npm install
```

#### Frontend
```powershell
cd ..
npm install
```

### Step 2: Configure Environment

#### Backend Environment
```powershell
cd backend
Copy-Item .env.example .env
```

Edit `backend\.env` with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jfft-db
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
```

### Step 3: Start MongoDB

#### Option A: Local MongoDB
```powershell
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Step 4: Run Applications

Open two PowerShell terminals:

#### Terminal 1 - Backend
```powershell
cd backend
npm run dev
```
✅ Backend running on http://localhost:5000

#### Terminal 2 - Frontend
```powershell
npm run dev
```
✅ Frontend running on http://localhost:5173

### Step 5: Test the Application

1. Open browser to http://localhost:5173
2. Click "Get Started" or "Sign Up"
3. Create an account
4. Login and explore!

## Default Test Credentials

After seeding (optional):
- **Email**: student@test.com
- **Password**: student123

## Verify Installation

### Check Backend
```powershell
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "success",
  "message": "JFFT API is running"
}
```

### Check Frontend
Open http://localhost:5173 - you should see the landing page

## Common Issues

### Issue: MongoDB Connection Error
**Solution**: 
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env
- Try MongoDB Atlas instead

### Issue: Port Already in Use
**Solution**:
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Issue: Node Modules Error
**Solution**:
```powershell
# Delete and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue: CORS Error
**Solution**: Verify FRONTEND_URL in backend/.env matches your frontend URL

## Next Steps

1. **Create a School Account** (optional)
2. **Practice Typing** at /dashboard/practice
3. **View Leaderboard** at /dashboard/leaderboard
4. **Earn Achievements** at /dashboard/achievements
5. **Generate Certificates** at /dashboard/certificates

## Production Deployment

See [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md) for deployment instructions.

## Need Help?

- 📖 Read [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md)
- 🔌 Check [API_INTEGRATION.md](./API_INTEGRATION.md)
- 📚 Review [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)

---

Happy Typing! 🎯⌨️
