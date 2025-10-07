import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Plans = ({ handleLogout }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free Trial',
      price: '$0',
      duration: 'Free for 14 days',
      description: 'Explore TRUBITX with essential features',
      features: ['1 campaign', 'Daily batch updates', 'Basic reporting'],
      buttonText: 'Start Free Trial',
      buttonVariant: 'primary',
      highlighted: false,
    },
    {
      name: 'Pro Plan',
      price: '$40/month',
      duration: '',
      description: 'Everything you need to scale',
      subDescription: 'Best for growing teams and multi-market ops.',
      features: ['Unlimited campaigns', 'Advanced reporting', 'Multi-market support'],
      buttonText: 'Choose Pro Plan',
      buttonVariant: 'primary',
      highlighted: false,
    },
    {
      name: 'Enterprise',
      price: 'Custom Pricing',
      duration: '',
      description: 'Tailored for large organizations',
      subDescription: 'Compliance-ready and mission-critical.',
      features: ['SLA', 'API access', 'Dedicated support'],
      buttonText: 'Contact Us',
      buttonVariant: 'outlined',
      highlighted: true,
      badge: 'Custom Pricing',
    },
  ];

  return (
    <div handleLogout={handleLogout}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose your plan</h1>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                Annual
              </button>
            </div>

            {/* Pricing Notice */}
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <span className="text-blue-600">🎯</span>
              {billingCycle === 'monthly'
                ? 'Monthly pricing is active. Switch to Annual to compare savings.'
                : 'Annual pricing is active. Get 2 months free on Pro when billed yearly.'}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                  plan.highlighted ? 'ring-2 ring-blue-600 scale-105' : ''
                }`}
              >
                <div className="p-8 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    {plan.badge && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {plan.duration && <p className="text-sm text-gray-600 mb-4">{plan.duration}</p>}

                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {plan.name === 'Pro Plan' && billingCycle === 'annual' ? (
                        <>
                          <span className="text-xl text-green-600 font-semibold block mb-1">
                            2 Months free
                          </span>
                          <span className="text-2xl">$400/year</span>
                        </>
                      ) : (
                        plan.price
                      )}
                    </div>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-1">{plan.description}</h4>
                  {plan.subDescription && (
                    <p className="text-sm text-gray-600 mb-6">{plan.subDescription}</p>
                  )}

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      // save plan in session
                      const user = JSON.parse(localStorage.getItem('trubitx_user')) || {};
                      user.plan = plan.name;
                      localStorage.setItem('trubitx_user', JSON.stringify(user));

                      // go back to campaigns and open wizard
                      navigate('/campaign?wizard=1');
                    }}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                      plan.buttonVariant === 'primary'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            You can change or cancel your plan anytime in Settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default Plans;
