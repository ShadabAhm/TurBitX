// services/campaignService.js
import axios from 'axios';
import { authService } from './authService';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with auth interceptor
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests automatically
api.interceptors.request.use((config) => {
  const token = authService.getToken();
  console.log('Auth Token:', token); // Debug log
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('No auth token found');
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      authService.clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

class CampaignService {
  // Create new campaign
  async createCampaign(campaignData) {
    try {
      const response = await api.post('/v1/campaign', campaignData);
      return response.data;
    } catch (error) {
      console.error('Create campaign error:', error);
      throw error;
    }
  }

  // Get all campaigns with pagination - FIXED ENDPOINT
  async getCampaigns(page = 1, itemsPerPage = 10) {
    try {
      // Try without query parameters first, as your backend might not support them
      const response = await api.get('/v1/campaigns');
      console.log('Campaigns API Response:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('Get campaigns error:', error);
      throw error;
    }
  }

  // Get single campaign
  async getCampaign(campaignId) {
    try {
      const response = await api.get(`/v1/campaign/${campaignId}`);
      return response.data;
    } catch (error) {
      console.error('Get campaign error:', error);
      throw error;
    }
  }

  // Get campaign status
  async getCampaignStatus(campaignId) {
    try {
      const response = await api.get(`/v1/campaign/${campaignId}/status`);
      return response.data;
    } catch (error) {
      console.error('Get campaign status error:', error);
      throw error;
    }
  }

  // Pause campaign
  async pauseCampaign(campaignId) {
    try {
      const response = await api.post(`/v1/campaign/${campaignId}/pause`);
      return response.data;
    } catch (error) {
      console.error('Pause campaign error:', error);
      throw error;
    }
  }

  // Resume campaign
  async resumeCampaign(campaignId) {
    try {
      const response = await api.post(`/v1/campaign/${campaignId}/resume`);
      return response.data;
    } catch (error) {
      console.error('Resume campaign error:', error);
      throw error;
    }
  }

  // Cancel campaign
  async cancelCampaign(campaignId) {
    try {
      const response = await api.post(`/v1/campaign/${campaignId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Cancel campaign error:', error);
      throw error;
    }
  }

  // Delete campaign
  async deleteCampaign(campaignId) {
    try {
      const response = await api.delete(`/v1/campaign/${campaignId}`);
      return response.data;
    } catch (error) {
      console.error('Delete campaign error:', error);
      throw error;
    }
  }

  // Get campaign limits
  async getCampaignLimits() {
    try {
      const response = await api.get('/v1/campaign/limits');
      return response.data;
    } catch (error) {
      console.error('Get campaign limits error:', error);
      throw error;
    }
  }

  // Get campaign results
  async getCampaignResults(campaignId) {
    try {
      const response = await api.get(`/v1/campaign/${campaignId}/results`);
      return response.data;
    } catch (error) {
      console.error('Get campaign results error:', error);
      throw error;
    }
  }
}

export const campaignService = new CampaignService();