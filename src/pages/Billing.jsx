import React, { useState } from "react";
import Header from '../components/Header';
import {
    Bell,
    Filter,
    CheckCheck,
    Download,
    MessageSquare,
    AlertTriangle,
    TrendingUp,
    User
} from 'lucide-react';


const Billing = ({ handleLogout }) => {
    const user = JSON.parse(sessionStorage.getItem('trubitx_user') || '{}');
    const [activeTab, setActiveTab] = useState("overview");

    const invoices = [
        { date: "Sep 28, 2025", number: "#INV-0087", amount: "$149.00", status: "Paid" },
        { date: "Aug 28, 2025", number: "#INV-0086", amount: "$149.00", status: "Paid" },
        { date: "Jul 28, 2025", number: "#INV-0085", amount: "$149.00", status: "Paid" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header user={user} handleLogout={handleLogout} />
            <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <Bell className="w-6 h-6 text-gray-700" />
                        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
                    </div>

                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1 h-full">
                        {/* Left Sidebar */}

                        <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
                            <button
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "overview"
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                onClick={() => setActiveTab("overview")}
                            >
                                Overview
                            </button>
                            <button
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "payment"
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                onClick={() => setActiveTab("payment")}
                            >
                                Payment & Billing Details
                            </button>
                            <button
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "plan"
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                onClick={() => setActiveTab("plan")}
                            >
                                Usage, Plan & Add-ons
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <main className="lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">


                            {activeTab === "overview" && (
                                <div>
                                    <h1 className="text-2xl font-semibold mb-6">Overview</h1>

                                    {/* Current Plan Summary */}
                                    <div className="grid grid-cols-3 gap-6 mb-8">
                                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                                            <p className="text-sm text-gray-500 mb-1">Current plan</p>
                                            <h3 className="text-xl font-semibold mb-1">Pro Team</h3>
                                            <p className="text-sm text-gray-600">Monthly • $149</p>
                                        </div>
                                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                                            <p className="text-sm text-gray-500 mb-1">Seats used</p>
                                            <h3 className="text-xl font-semibold mb-1">7 / 10</h3>
                                            <p className="text-sm text-gray-600">3 available</p>
                                        </div>
                                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                                            <p className="text-sm text-gray-500 mb-1">Last invoice</p>
                                            <h3 className="text-xl font-semibold mb-1">$149</h3>
                                            <p className="text-sm text-gray-600">Sep 28, 2025</p>
                                        </div>
                                    </div>

                                    {/* Invoices Table */}
                                    <div className="bg-white rounded-lg border border-gray-200">
                                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                            <h2 className="text-lg font-semibold">Invoices</h2>
                                            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Last 12 months
                                            </button>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead className="bg-gray-50 border-b border-gray-200">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {invoices.map((inv, i) => (
                                                        <tr key={i} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inv.date}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inv.number}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inv.amount}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    {inv.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                                <button className="text-gray-600 hover:text-gray-900 font-medium">PDF</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        

                        {activeTab === "payment" && (
                            <div>
                                <h1 className="text-2xl font-semibold mb-6">Payment Method</h1>

                                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                                                    <rect width="32" height="20" rx="3" fill="#1434CB" />
                                                </svg>
                                                <div>
                                                    <p className="font-medium text-gray-900">Visa •••• 4242</p>
                                                    <p className="text-sm text-gray-500">Expires 08/27</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                            Update
                                        </button>
                                    </div>
                                </div>

                                <h2 className="text-lg font-semibold mb-4">Billing Details</h2>

                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <div className="space-y-4">
                                        <input
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Company Name"
                                            defaultValue="TruBitX Inc."
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Street"
                                                defaultValue="99 Hudson Street"
                                            />
                                            <input
                                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="City"
                                                defaultValue="New York"
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <input
                                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="State"
                                                defaultValue="NY"
                                            />
                                            <input
                                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="ZIP"
                                                defaultValue="10013"
                                            />
                                            <input
                                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Country"
                                                defaultValue="United States"
                                            />
                                        </div>

                                        <input
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Tax ID"
                                            defaultValue="Tax ID: US-12-3456789"
                                        />

                                        <div className="flex justify-end gap-3 pt-2">
                                            <button
                                                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                                </svg>
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "plan" && (
                            <div>
                                <h1 className="text-2xl font-semibold mb-6">Usage (Last 30 days)</h1>

                                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                                                    <rect width="32" height="20" rx="3" fill="#1434CB" />
                                                </svg>
                                                <div>
                                                    <p className="font-medium text-gray-900">Visa •••• 4242</p>
                                                    <p className="text-sm text-gray-500">Expires 08/27</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                            Update
                                        </button>
                                    </div>
                                </div>

                                <h2 className="text-lg font-semibold mb-4">Billing Details</h2>

                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <div className="space-y-4">
                                        <input
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Company Name"
                                            defaultValue="TruBitX Inc."
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Street"
                                                defaultValue="99 Hudson Street"
                                            />
                                            <input
                                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="City"
                                                defaultValue="New York"
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <input
                                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="State"
                                                defaultValue="NY"
                                            />
                                            <input
                                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="ZIP"
                                                defaultValue="10013"
                                            />
                                            <input
                                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Country"
                                                defaultValue="United States"
                                            />
                                        </div>

                                        <input
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Tax ID"
                                            defaultValue="Tax ID: US-12-3456789"
                                        />

                                        <div className="flex justify-end gap-3 pt-2">
                                            <button
                                                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                                </svg>
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
};

export default Billing;