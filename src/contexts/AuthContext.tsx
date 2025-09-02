import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'employee';
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

// Configure axios defaults
axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || 'http://localhost:4000/';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('teamcollab-token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Verify token and get user info
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Check if the user is authenticated so we have to send the token first and then get the user data
  const checkAuth = async () => {
    try {
      const response = await axios.get('/auth/me');
      console.log('Auth check response:', response.data); // Debug log

      // Map the API response to our User interface
      const userData: User = {
        id: response.data.sub || response.data.id,
        name: response.data.name || response.data.email.split('@')[0], // Fallback to email username if name not provided
        email: response.data.email,
        role: response.data.role.toLowerCase() as
          | 'admin'
          | 'manager'
          | 'employee',
        avatar: response.data.avatar,
        department: response.data.department,
      };

      setUser(userData);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('teamcollab-token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { accessToken: token, user: userData } = response.data;
      console.log(response.data);

      localStorage.setItem('teamcollab-token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      toast.success(`Welcome back, ${userData.name}!`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: string = 'Employee'
  ) => {
    try {
      const response = await axios.post('/auth/register', {
        name,
        email,
        password,
        role,
      });
      const { accessToken: token, user: userData } = response.data;

      localStorage.setItem('teamcollab-token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      toast.success(`Welcome to TeamCollab, ${userData.name}!`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('teamcollab-token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
