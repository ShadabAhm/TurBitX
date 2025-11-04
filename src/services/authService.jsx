import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh or auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      authService.clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

class AuthService {
  // Consolidated login method
  async login(credentials) {
    const response = await api.post('/v1/login', {
      username_or_email: credentials.email,
      password: credentials.password
    });

    if (response.data.access_token) {
      this.setToken(response.data.access_token, credentials.rememberMe);
      // Optionally fetch user data here
      await this.fetchCurrentUser();
    }

    return response.data;
  }

  // Register - improved error handling
  async register(userData) {
    try {
      const response = await api.post('/v1/user', {
        name: userData.fullName,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        company_name: userData.company || null,
        terms_accepted: userData.agreeToTerms,
      });
      return response.data;
    } catch (error) {
      throw this.formatError(error);
    }
  }

  // Forgot Password
  async forgotPassword(email) {
    try {
      const response = await api.post('/v1/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw this.formatError(error);
    }
  }

  // Reset Password
  // In your AuthService - update the resetPassword method
  async resetPassword(token, newPassword) {
    try {
      const response = await api.post('/v1/reset-password', {
        token: token,
        new_password: newPassword
      });
      return response.data;
    } catch (error) {
      throw this.formatError(error);
    }
  }

  // Logout
  async logout() {
    const token = this.getToken();
    if (token) {
      try {
        await api.post('/v1/logout', {});
      } catch (err) {
        console.error('Logout API error:', err);
      }
    }
    this.clearAuth();
  }

  // Get subscription plans
  async getPlans() {
    try {
      const response = await api.get('/v1/tiers');
      return response.data.data || response.data;
    } catch (error) {
      throw this.formatError(error);
    }
  }

  // Token management
  getToken() {
    return localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
  }

  setToken(token, rememberMe = false) {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("access_token", token);
  }

  clearAuth() {
    // Clear all storage items
    ['auth', 'access_token', 'user'].forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  getUser() {
    const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  setUser(user, rememberMe = false) {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("user", JSON.stringify(user));
    storage.setItem("auth", "true");
  }

  async fetchCurrentUser() {
    try {
      const token = this.getToken();
      if (!token) return null;

      const response = await api.get('/v1/user/me/');
      this.setUser(response.data, true);
      return response.data;
    } catch (error) {
      console.error('fetchCurrentUser error:', error);
      this.clearAuth();
      return null;
    }
  }

  // Utility method to format errors consistently
  formatError(error) {
    if (error.response?.data?.detail) {
      if (Array.isArray(error.response.data.detail)) {
        const formattedErrors = {};
        error.response.data.detail.forEach((error) => {
          const field = error.loc[error.loc.length - 1];
          formattedErrors[field] = error.msg;
        });
        return { details: formattedErrors, message: 'Validation failed' };
      }
      return { message: error.response.data.detail };
    }
    return { message: error.message || 'An error occurred' };
  }
}

export const authService = new AuthService();