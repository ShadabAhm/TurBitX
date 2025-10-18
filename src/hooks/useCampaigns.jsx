// hooks/useCampaigns.js
import { useState, useEffect, useCallback } from 'react';
import { campaignService } from '../services/campaignService';

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    pages: 0,
    size: 10
  });

  const fetchCampaigns = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching campaigns...'); // Debug log
      
      const response = await campaignService.getCampaigns(page);
      console.log('Campaigns data:', response); // Debug log
      
      // Handle different response formats
      if (response.data) {
        // If response has data property
        setCampaigns(response.data);
        setPagination({
          page: response.page || 1,
          total: response.total_count || response.data.length,
          pages: response.pages || 1,
          size: response.size || 10
        });
      } else if (Array.isArray(response)) {
        // If response is directly an array
        setCampaigns(response);
        setPagination({
          page: 1,
          total: response.length,
          pages: 1,
          size: 10
        });
      } else {
        // Fallback
        setCampaigns([]);
      }
    } catch (err) {
      console.error('Error in fetchCampaigns:', err);
      setError(err.response?.data?.detail || 'Failed to fetch campaigns');
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCampaign = async (campaignData) => {
    try {
      setError(null);
      const newCampaign = await campaignService.createCampaign(campaignData);
      await fetchCampaigns(1); // Refresh list
      return newCampaign;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Failed to create campaign';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const deleteCampaign = async (campaignId) => {
    try {
      setError(null);
      await campaignService.deleteCampaign(campaignId);
      await fetchCampaigns(pagination.page);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete campaign');
      throw err;
    }
  };

  const pauseCampaign = async (campaignId) => {
    try {
      await campaignService.pauseCampaign(campaignId);
      await fetchCampaigns(pagination.page);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to pause campaign');
      throw err;
    }
  };

  const resumeCampaign = async (campaignId) => {
    try {
      await campaignService.resumeCampaign(campaignId);
      await fetchCampaigns(pagination.page);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to resume campaign');
      throw err;
    }
  };

  const cancelCampaign = async (campaignId) => {
    try {
      await campaignService.cancelCampaign(campaignId);
      await fetchCampaigns(pagination.page);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to cancel campaign');
      throw err;
    }
  };

  // Fix double API call - use useEffect properly
  useEffect(() => {
    let isMounted = true;
    
    const loadCampaigns = async () => {
      if (isMounted) {
        await fetchCampaigns(1);
      }
    };

    loadCampaigns();

    return () => {
      isMounted = false;
    };
  }, [fetchCampaigns]);

  return {
    campaigns,
    loading,
    error,
    pagination,
    fetchCampaigns,
    createCampaign,
    deleteCampaign,
    pauseCampaign,
    resumeCampaign,
    cancelCampaign
  };
};