import axios from 'axios';

// Use relative URL for Vite proxy or environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
// const API_BASE_URL = 'http://localhost:8000/api'; // Direct URL (causes CORS issues)

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // For cookies (refresh tokens)
});

class AuthService {
  // Login
  async login(credentials) {
    const response = await api.post('/v1/login', {
      username_or_email: credentials.email,
      password: credentials.password
    });
    return response.data;
  }

  // Register
  async register(userData) {
    const response = await api.post('/v1/user', {
      name: userData.fullName,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      company_name: userData.company || null,
      terms_accepted: userData.agreeToTerms,
    });
    return response.data;
  }

  // Forgot Password
  async forgotPassword(email) {
    const response = await api.post('/v1/forgot-password', { email });
    return response.data;
  }

  // Reset Password
  async resetPassword(token, newPassword) {
    const response = await api.post('/v1/reset-password', 
      { new_password: newPassword },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  }

  // Logout
  async logout() {
    const token = this.getToken();
    if (token) {
      try {
        await api.post('/v1/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error('Logout API error:', err);
      }
    }
    this.clearAuth();
  }

  // Get subscription plans/tiers
  async getPlans() {
    const response = await api.get('/v1/tiers');
    return response.data.data || response.data;
  }

  // Token management
  getToken() {
    return localStorage.getItem("trubitx_access_token") || 
           sessionStorage.getItem("trubitx_access_token");
  }

  setToken(token, rememberMe = false) {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("trubitx_access_token", token);
  }

  clearAuth() {
    localStorage.removeItem("trubitx_auth");
    localStorage.removeItem("trubitx_access_token");
    localStorage.removeItem("trubitx_user");
    sessionStorage.removeItem("trubitx_auth");
    sessionStorage.removeItem("trubitx_access_token");
    sessionStorage.removeItem("trubitx_user");
  }

  isAuthenticated() {
    return !!(this.getToken() || localStorage.getItem("trubitx_auth"));
  }

  getUser() {
    const userStr = localStorage.getItem("trubitx_user") || 
                    sessionStorage.getItem("trubitx_user");
    return userStr ? JSON.parse(userStr) : null;
  }

  setUser(user, rememberMe = false) {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("trubitx_user", JSON.stringify(user));
    storage.setItem("trubitx_auth", "true");
  }
}

export const authService = new AuthService();