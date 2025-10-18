import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Plans = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await authService.getPlans();
        setPlans(data);
      } catch (err) {
        console.error('Failed to fetch plans:', err);
        setError('Failed to load plans. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const getVisiblePlans = () => {
    const free = plans.find(p => p.name.toLowerCase() === 'free');
    const pro =
      billingCycle === 'monthly'
        ? plans.find(p => p.name.toLowerCase().includes('pro monthly'))
        : plans.find(p => p.name.toLowerCase().includes('pro annual'));
    const enterprise =
      billingCycle === 'monthly'
        ? plans.find(p => p.name.toLowerCase().includes('enterprise monthly'))
        : plans.find(p => p.name.toLowerCase().includes('enterprise annual'));

    return [free, pro, enterprise].filter(Boolean);
  };

  const visiblePlans = getVisiblePlans();

  const handlePlanSelect = (plan) => {
    const user = authService.getUser();
    if (user) {
      user.plan = plan.name;
      authService.setUser(user, true);
    }
    navigate('/campaign?wizard=1');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose your plan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the plan that best fits your PR monitoring needs. All plans include core features with varying limits.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-6 mt-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingCycle === 'annual'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {visiblePlans.map((plan, index) => (
            <div
              key={plan.id || index}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl border-2 ${
                plan.name.toLowerCase().includes('pro') 
                  ? 'border-blue-500 ring-2 ring-blue-600 scale-105' 
                  : 'border-gray-200'
              }`}
            >
              {plan.name.toLowerCase().includes('pro') && (
                <div className="bg-blue-600 text-white text-center py-2">
                  <span className="text-sm font-semibold">Most Popular</span>
                </div>
              )}
              
              <div className="p-8 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  {plan.badge && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4">{plan.duration || 'Lifetime access'}</p>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.original_price && (
                    <span className="text-lg text-gray-500 line-through ml-2">
                      {plan.original_price}
                    </span>
                  )}
                </div>

                <h4 className="font-semibold text-gray-900 mb-1">{plan.description}</h4>
                {plan.sub_description && (
                  <p className="text-sm text-gray-600 mb-6">{plan.sub_description}</p>
                )}

                <ul className="space-y-3 mb-8">
                  {plan.features && plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                    plan.name.toLowerCase().includes('pro')
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                      : plan.name.toLowerCase() === 'free'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                      : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {plan.button_text || `Get ${plan.name}`}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Need a custom solution?{' '}
            <button 
              onClick={() => navigate('/contact')}
              className="text-blue-600 font-medium hover:underline"
            >
              Contact our sales team
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Plans;