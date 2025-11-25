# API Integration Guide - Frontend to Backend

This guide explains how to connect the React frontend to the Express backend API.

## 🔧 Setup

### 1. Install Axios

```bash
npm install axios
```

### 2. Create API Client

Create `src/lib/api.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 3. Create Environment Variables

Create `.env` in frontend root:

```env
VITE_API_URL=http://localhost:5000/api
```

## 📡 API Service Functions

### Authentication Service

Create `src/services/auth.service.ts`:

```typescript
import api from '@/lib/api';

export const authService = {
  // Register
  register: async (data: {
    name: string;
    email: string;
    password: string;
    role?: string;
    schoolId?: string;
  }) => {
    const response = await api.post('/auth/register', data);
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Login
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data.data.user;
  },

  // Update profile
  updateProfile: async (data: { name?: string; avatar?: string }) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
```

### Typing Service

Create `src/services/typing.service.ts`:

```typescript
import api from '@/lib/api';

export const typingService = {
  // Submit typing session
  submitSession: async (data: {
    text: string;
    sessionType: 'practice' | 'assignment' | 'challenge';
    assignmentId?: string;
    wpm: number;
    accuracy: number;
    totalCharacters: number;
    correctCharacters: number;
    incorrectCharacters: number;
    duration: number;
    startTime: string;
    errorAnalysis?: any;
  }) => {
    const response = await api.post('/typing/submit', data);
    return response.data;
  },

  // Get practice texts
  getTexts: async (params?: { difficulty?: string; category?: string }) => {
    const response = await api.get('/typing/texts', { params });
    return response.data.data.texts;
  },

  // Get progress history
  getProgress: async (params?: { page?: number; limit?: number; sessionType?: string }) => {
    const response = await api.get('/typing/progress', { params });
    return response.data.data;
  },
};
```

### Assignment Service

Create `src/services/assignment.service.ts`:

```typescript
import api from '@/lib/api';

export const assignmentService = {
  // Get all assignments
  getAssignments: async (params?: {
    classId?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get('/assignments', { params });
    return response.data.data;
  },

  // Get assignment by ID
  getAssignment: async (id: string) => {
    const response = await api.get(`/assignments/${id}`);
    return response.data.data.assignment;
  },

  // Create assignment (Teacher only)
  createAssignment: async (data: {
    title: string;
    description: string;
    classId: string;
    typingText: string;
    targetWPM: number;
    targetAccuracy: number;
    dueDate: string;
    difficulty: string;
  }) => {
    const response = await api.post('/assignments', data);
    return response.data.data.assignment;
  },
};
```

### Other Services

Similarly, create services for:
- `leaderboard.service.ts`
- `certificate.service.ts`
- `achievement.service.ts`
- `voice.service.ts`

## 🎣 React Query Integration

### Setup React Query

Update `src/App.tsx`:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
```

### Custom Hooks

Create `src/hooks/useAuth.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    enabled: !!localStorage.getItem('token'),
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      navigate('/dashboard');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear();
      navigate('/login');
    },
  });

  return {
    user,
    isLoading,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isAuthenticated: !!user,
  };
};
```

Create `src/hooks/useTyping.ts`:

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { typingService } from '@/services/typing.service';

export const useTyping = () => {
  const queryClient = useQueryClient();

  const submitSessionMutation = useMutation({
    mutationFn: typingService.submitSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });

  const { data: texts } = useQuery({
    queryKey: ['typingTexts'],
    queryFn: () => typingService.getTexts(),
  });

  return {
    submitSession: submitSessionMutation.mutate,
    isSubmitting: submitSessionMutation.isPending,
    texts,
  };
};
```

## 🔄 Update Components

### Update Login Page

Update `src/pages/Login.tsx`:

```typescript
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

### Update Typing Practice

Update `src/pages/TypingPractice.tsx`:

```typescript
import { useTyping } from '@/hooks/useTyping';

const TypingPractice = () => {
  const { submitSession, isSubmitting } = useTyping();

  const handleComplete = async (results: any) => {
    await submitSession({
      text: currentText,
      sessionType: 'practice',
      wpm: results.wpm,
      accuracy: results.accuracy,
      totalCharacters: results.total,
      correctCharacters: results.correct,
      incorrectCharacters: results.errors,
      duration: results.duration,
      startTime: results.startTime,
    });
  };

  // ... rest of component
};
```

## 🔐 Protected Routes

Create `src/components/ProtectedRoute.tsx`:

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
```

Update `src/App.tsx`:

```typescript
import { ProtectedRoute } from './components/ProtectedRoute';

// In Routes
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## 🎨 Loading & Error States

Create `src/components/LoadingSpinner.tsx`:

```typescript
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);
```

## 📦 Complete Package.json Update

Add to `package.json`:

```json
{
  "dependencies": {
    "axios": "^1.6.2"
  }
}
```

## ✅ Testing API Integration

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `npm run dev`
3. Test registration at `/signup`
4. Test login at `/login`
5. Test typing practice at `/dashboard/practice`

## 🐛 Common Issues

### CORS Errors
Add to backend `server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Token Not Sending
Check axios interceptor is configured correctly.

### 401 Errors
Ensure token is saved in localStorage after login.

---

This completes the API integration! All components should now communicate with the backend.
