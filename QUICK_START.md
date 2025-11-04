# Typing Master - Quick Start Guide

## 🚀 Getting Started

### 1. Installation
The project is already set up with all dependencies. If you need to reinstall:
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will be available at: **http://localhost:8080/**

### 3. Login to Dashboard
1. Navigate to the landing page
2. Click **"Start Typing"** or **"Sign In"** button
3. Enter your name (e.g., "Hirwa Ivan", "Student", or any name)
4. Enter password: **`student12`**
5. Click **"Login"**

You'll be redirected to the dashboard!

## 📱 Testing Responsiveness

### Desktop View (> 1024px)
- Full sidebar visible
- Multi-column layouts
- All features accessible

### Tablet View (640px - 1024px)
- Responsive grids (2 columns)
- Optimized spacing
- Touch-friendly buttons

### Mobile View (< 640px)
- Hamburger menu
- Collapsible sidebar
- Single column layouts
- Horizontal scroll for tables

**To test**: Resize your browser window or use browser DevTools (F12) → Device Toolbar

## 🎯 Key Features to Explore

### 1. **Dashboard** (`/dashboard`)
- View your typing statistics
- Quick access to practice and assignments
- Recent activity feed

### 2. **Assignments** (`/dashboard/assignments`)
- Complete table with 20 sample assignments
- Search, filter, and sort functionality
- Click the three dots (⋮) to access actions
- Click "Start Practice" to begin typing

### 3. **Typing Practice** (`/dashboard/practice`)
- **Interactive typing interface** with real-time feedback
- **Virtual keyboard** that highlights the next key to press
- **Live statistics**: WPM, Accuracy, Progress
- Type the displayed text to see:
  - Green text for correct characters
  - Red text for errors
  - Current character highlighted
  - Keyboard key highlighting

### 4. **Students** (`/dashboard/students`)
- View student profiles with **Rwandan names**:
  - Hirwa Ivan
  - Iradukunda Sedrick
  - Adeline Iradukunda
  - Mugisha Patrick
  - Uwase Grace
  - Niyonzima Eric

### 5. **Classes** (`/dashboard/classes`)
- Overview of all classes
- Student and assignment counts

### 6. **Settings** (`/dashboard/settings`)
- Profile settings
- Typing preferences
- Notification settings

## 🎨 Design Features

### Color Scheme
- **Primary Color**: Green (`#22c55e`)
- **Dark Theme**: Professional dark background
- **High Contrast**: Excellent readability

### Animations
- Smooth transitions
- Hover effects
- Loading states
- Key press feedback

### Typography
- Clean, modern fonts
- Proper hierarchy
- Readable at all sizes

## 🔑 Important Notes

### Authentication
- **Password**: Always `student12`
- **Name**: Can be anything
- Session stored in browser's localStorage
- Logout clears session

### Data
- All data is currently **mock/sample data**
- No backend integration yet
- Perfect for frontend demonstration

### Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📊 Testing the Typing Practice

1. Go to Dashboard
2. Click **"Start Typing Practice"** or navigate to Assignments
3. Click **"Start Practice"** on any assignment
4. You'll see:
   - Text to type at the top
   - Input area below
   - Virtual keyboard at the bottom
   - Real-time statistics

5. Start typing:
   - Correct characters turn **green**
   - Incorrect characters turn **red** with background
   - Current character is **highlighted**
   - Keyboard shows which key to press next

6. Watch your stats update:
   - **WPM** (Words Per Minute)
   - **Accuracy** percentage
   - **Progress** bar
   - **Error** count

7. Complete the text to see congratulations message!

## 🎯 Rwandan Names Integration

The application now uses authentic Rwandan names throughout:

### Testimonials (Landing Page)
- Hirwa Ivan
- Iradukunda Sedrick
- Adeline Iradukunda
- Mugisha Patrick
- Uwase Grace
- Niyonzima Eric

### Student Profiles
Same names with performance metrics (WPM and Accuracy)

## 📱 Mobile Testing Tips

### Using Browser DevTools
1. Press **F12** to open DevTools
2. Click the **device toolbar** icon (or Ctrl+Shift+M)
3. Select different devices:
   - iPhone 12/13/14
   - iPad
   - Samsung Galaxy
   - Custom dimensions

### What to Test
- ✅ Sidebar collapses to hamburger menu
- ✅ Tables scroll horizontally
- ✅ Cards stack vertically
- ✅ Buttons are touch-friendly
- ✅ Forms are easy to fill
- ✅ Keyboard is visible and usable

## 🛠️ Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── pages/           # All page components
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Assignments.tsx
│   ├── TypingPractice.tsx
│   └── ...
├── components/      # Reusable components
│   ├── DashboardLayout.tsx
│   ├── TypingKeyboard.tsx
│   └── ui/         # shadcn/ui components
└── App.tsx         # Main routing
```

## 🎓 Learning Path

### For Students
1. Start with the landing page
2. Sign up or log in
3. Explore the dashboard
4. Try typing practice
5. Check your progress

### For Developers
1. Review the code structure
2. Understand the routing (App.tsx)
3. Explore components
4. Check responsive design patterns
5. Study the typing practice logic

## 🐛 Troubleshooting

### Server won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Port 8080 already in use
- Check if another instance is running
- Or change port in `vite.config.ts`

### Login not working
- Make sure password is exactly: `student12`
- Check browser console for errors
- Clear localStorage and try again

### Keyboard not highlighting
- Make sure you're in the typing practice page
- Start typing to activate the keyboard
- Check that JavaScript is enabled

## 📞 Support

For issues or questions:
1. Check the PROJECT_DOCUMENTATION.md
2. Review the code comments
3. Check browser console for errors
4. Verify all dependencies are installed

## ✨ Next Steps

1. **Try all features** - Explore every page
2. **Test responsiveness** - Resize the window
3. **Practice typing** - Use the typing practice feature
4. **Check the code** - Learn from the implementation
5. **Customize** - Modify colors, text, or features

---

**Enjoy using Typing Master! 🎉**

Remember: Password is `student12` for all logins!

