import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

const CampaignWizard = ({ onClose, onFinish }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    keywords: "",
    competitors: ["", ""],
    markets: [],
    duration: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCompetitorChange = (index, value) => {
    const newCompetitors = [...formData.competitors];
    newCompetitors[index] = value;
    setFormData((prev) => ({ ...prev, competitors: newCompetitors }));
  };

  const toggleMarket = (region) => {
    setFormData((prev) => ({
      ...prev,
      markets: prev.markets.includes(region)
        ? prev.markets.filter((r) => r !== region)
        : [...prev.markets, region],
    }));
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const finish = () => {
    const newCampaign = {
      id: crypto.randomUUID(), // unique ID
      title: formData.keywords || "Untitled Campaign",
      keywords: formData.keywords,
      brands: formData.competitors.filter((c) => c.trim() !== ""),
      regions: formData.markets,
      duration:
        formData.duration === "Custom"
          ? `${formData.customDays} Days`
          : formData.duration,
      status: "Active",
      lastUpdated: "just now",

    };

    onFinish(newCampaign);
    setStep(6); // move to success stage
  };

  // Validation rules per step
  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.keywords.trim() !== "";
      case 2:
        return formData.competitors.some((c) => c.trim() !== "");
      case 3:
        return formData.markets.length > 0;
      case 4:
        if (formData.duration === "Custom") {
          return formData.customDays && Number(formData.customDays) > 0;
        }
        return formData.duration !== "";

      default:
        return true;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

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
            <h2 className="text-lg font-semibold mb-2">Add Brand Keywords</h2>
            <input
              type="text"
              placeholder='e.g. "TRUBITX", "Actionable Intelligence"'
              value={formData.keywords}
              onChange={(e) => handleChange("keywords", e.target.value)}
              className="w-full border rounded-lg p-3 mb-4"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Add Competitors</h2>
            <div className="flex gap-3">
              {formData.competitors.map((comp, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Competitor ${idx + 1}`}
                  value={comp}
                  onChange={(e) => handleCompetitorChange(idx, e.target.value)}
                  className="flex-1 border rounded-lg p-3"
                />
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Select Markets</h2>
            <div className="flex flex-wrap gap-3">
              {["US", "India", "EU", "UK", "APAC"].map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => toggleMarket(region)}
                  className={`px-4 py-2 rounded-full border ${formData.markets.includes(region)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-gray-100"
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
            <h2 className="text-lg font-semibold mb-2">Select Duration</h2>
            <div className="flex flex-wrap gap-3 mb-4">
              {["7 Days", "14 Days", "30 Days", "Custom"].map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleChange("duration", day)}
                  className={`px-4 py-2 rounded-full border ${formData.duration === day
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-gray-100"
                    }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* 👇 Show input only if "Custom" is selected */}
            {formData.duration === "Custom" && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Custom Duration (in days)
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter number of days"
                  value={formData.customDays || ""}
                  onChange={(e) => handleChange("customDays", e.target.value)}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            )}
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Review & Submit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Brand Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  value={formData.keywords || ""}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={
                    formData.duration === "Custom"
                      ? `${formData.customDays || ""} Days`
                      : formData.duration
                  }
                  readOnly
                  className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Competitors (only filled ones) */}
              {formData.competitors
                .filter((c) => c.trim() !== "")
                .map((comp, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Competitor {idx + 1}
                    </label>
                    <input
                      type="text"
                      value={comp}
                      readOnly
                      className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                ))}

              {/* Markets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Markets
                </label>
                <input
                  type="text"
                  value={formData.markets.join(", ") || ""}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                />
              </div>
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
              Your campaign has been created successfully!
            </h2>

            {/* Status Information */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-700">Status</span>
                <span className="text-sm text-gray-900">Active • Ingesting</span>
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
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-lg border text-gray-700"
              >
                Back
              </button>
            )}
            {step < 5 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <button
                onClick={finish}
                className="px-6 py-2 bg-green-600 text-white rounded-lg"
              >
                Finish
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignWizard;
