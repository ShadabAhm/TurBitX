// components/CampaignWizard.js
import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { campaignService } from "../../services/campaignService";

const CampaignWizard = ({ onClose, onFinish, editCampaign }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    brand_keyword: "",
    competitors: ["", ""],
    regions: [],
    duration: "", // Changed from duration_days to duration for the selection
    customDays: "", // Separate field for custom days input
    duration_days: 14, // Final value to send to API
  });

  useEffect(() => {
    if (editCampaign) {
      // Pre-fill form for editing
      const isCustom = ![7, 14, 30, 60].includes(editCampaign.duration_days);
      setFormData({
        name: editCampaign.name || "",
        brand_keyword: editCampaign.brand_keyword || "",
        competitors: editCampaign.competitors?.length > 0
          ? [...editCampaign.competitors, ""]
          : ["", ""],
        regions: editCampaign.regions || [],
        duration: isCustom ? "Custom" : `${editCampaign.duration_days} Days`,
        customDays: isCustom ? editCampaign.duration_days.toString() : "",
        duration_days: editCampaign.duration_days || 14,
      });
    }
  }, [editCampaign]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCompetitorChange = (index, value) => {
    const newCompetitors = [...formData.competitors];
    newCompetitors[index] = value;
    setFormData((prev) => ({ ...prev, competitors: newCompetitors }));
  };

  const addCompetitor = () => {
    setFormData(prev => ({
      ...prev,
      competitors: [...prev.competitors, '']
    }));
  };

  const removeCompetitor = (index) => {
    if (formData.competitors.length > 1) {
      setFormData(prev => ({
        ...prev,
        competitors: prev.competitors.filter((_, i) => i !== index)
      }));
    }
  };

  const toggleRegion = (region) => {
    setFormData((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }));
  };

  const handleDurationSelect = (duration) => {
    if (duration === "Custom") {
      setFormData(prev => ({
        ...prev,
        duration: "Custom",
        duration_days: prev.customDays ? parseInt(prev.customDays) : 14
      }));
    } else {
      const days = parseInt(duration);
      setFormData(prev => ({
        ...prev,
        duration: duration,
        duration_days: days,
        customDays: "" // Clear custom days when selecting predefined duration
      }));
    }
  };

  const handleCustomDaysChange = (value) => {
    const days = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      customDays: value,
      duration_days: days > 0 ? days : 14
    }));
  };

  const nextStep = () => {
    if (step < 5 && isStepValid()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const submitCampaign = async () => {
    try {
      setLoading(true);
      setError(null);

      // Prepare data for API
      const apiData = {
        name: formData.name,
        brand_keyword: formData.brand_keyword,
        competitors: formData.competitors.filter(c => c.trim() !== ""),
        regions: formData.regions,
        duration_days: formData.duration_days,
        form_data: {
          // Include any additional form data if needed
        }
      };

      let result;
      if (editCampaign) {
        // Update existing campaign
        // Note: You'll need to implement update endpoint in your API
        // result = await campaignService.updateCampaign(editCampaign.id, apiData);
        console.log('Update campaign:', editCampaign.id, apiData);
      } else {
        // Create new campaign
        result = await campaignService.createCampaign(apiData);
      }

      setStep(6); // Move to success stage
      onFinish(result);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  // Validation rules per step
  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.trim() !== "" && formData.brand_keyword.trim() !== "";
      case 2:
        return formData.competitors.some((c) => c.trim() !== "");
      case 3:
        return formData.regions.length > 0;
      case 4:
        if (formData.duration === "Custom") {
          return formData.customDays && parseInt(formData.customDays) > 0;
        }
        return formData.duration !== "";
      default:
        return true;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Progress bar */}
        {step <= 5 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Step {step} of 5
              </span>
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-full">
              <div
                className="bg-blue-600 h-1 rounded-full transition-all"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step Content */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Campaign Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  placeholder='e.g. "Spring 2024 PR Campaign"'
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Keywords
                </label>
                <input
                  type="text"
                  placeholder='e.g. "TRUBITX", "Actionable Intelligence"'
                  value={formData.brand_keyword}
                  onChange={(e) => handleChange("brand_keyword", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Add Competitors</h2>
            <div className="space-y-3">
              {formData.competitors.map((comp, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder={`Competitor ${idx + 1}`}
                    value={comp}
                    onChange={(e) => handleCompetitorChange(idx, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.competitors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCompetitor(idx)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addCompetitor}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-dashed border-blue-300"
              >
                + Add Another Competitor
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Markets</h2>
            <div className="flex flex-wrap gap-3">
              {["US", "India", "EU", "UK", "APAC"].map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => toggleRegion(region)}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    formData.regions.includes(region)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Duration</h2>
            <div className="flex flex-wrap gap-3 mb-4">
              {["7 Days", "14 Days", "30 Days", "Custom"].map((duration) => (
                <button
                  key={duration}
                  type="button"
                  onClick={() => handleDurationSelect(duration)}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    formData.duration === duration
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>

            {/* Show input only if "Custom" is selected */}
            {formData.duration === "Custom" && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Custom Duration (in days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  placeholder="Enter number of days"
                  value={formData.customDays}
                  onChange={(e) => handleCustomDaysChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.customDays && parseInt(formData.customDays) > 90 && (
                  <p className="text-red-500 text-sm mt-1">Maximum duration is 90 days</p>
                )}
              </div>
            )}
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Review & Submit</h2>
            <div className="space-y-4 bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Name
                  </label>
                  <p className="text-gray-900">{formData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <p className="text-gray-900">
                    {formData.duration === "Custom" 
                      ? `${formData.duration_days} Days (Custom)`
                      : formData.duration
                    }
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Keywords
                </label>
                <p className="text-gray-900">{formData.brand_keyword}</p>
              </div>

              {formData.competitors.filter(c => c.trim() !== "").length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Competitors
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.competitors.filter(c => c.trim() !== "").map((comp, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white rounded border text-sm">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {formData.regions.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Markets
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.regions.map((region, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white rounded border text-sm">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="text-center py-8">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            {/* Success Message */}
            <h2 className="text-xl font-semibold mb-8">
              {editCampaign ? 'Campaign updated successfully!' : 'Your campaign has been created successfully!'}
            </h2>

            {/* Status Information */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-700">Status</span>
                <span className="text-sm text-gray-900">Processing • Ingesting</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-700">First results ETA</span>
                <span className="text-sm text-gray-900">~15 minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Included sources</span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span className="text-sm text-gray-900">Web</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        {step <= 5 && (
          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div> // Empty div to maintain space
            )}
            
            {step < 5 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={submitCampaign}
                disabled={loading || !isStepValid()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Campaign"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignWizard;