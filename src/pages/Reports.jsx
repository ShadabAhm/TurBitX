import React from "react";
import { Download, RefreshCw, BarChart2 } from "lucide-react";

const reports = [
  {
    date: "Sep 27, 2025 • 14:22",
    campaign: "Brand A — India Launch",
    type: "PDF",
    status: "Ready",
    action: "Download",
  },
  {
    date: "Sep 25, 2025 • 09:04",
    campaign: "Competitor B — Sentiment Sweep",
    type: "CSV",
    status: "Processing",
    action: "Download",
  },
  {
    date: "Sep 20, 2025 • 18:51",
    campaign: "Global SOV — Q3",
    type: "PDF",
    status: "Failed",
    action: "Retry",
  },
];

const statusColors = {
  Ready: "bg-green-500 text-white",
  Processing: "bg-orange-500 text-white",
  Failed: "bg-red-500 text-white",
};

const Reports = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center mb-4 text-lg font-semibold text-gray-800">
        <BarChart2 className="w-5 h-5 mr-2" />
        Reports
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          {/* Table Header */}
          <thead>
            <tr className="bg-indigo-500 text-white text-sm">
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Campaign</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {reports.map((report, idx) => (
              <tr
                key={idx}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-700">{report.date}</td>
                <td className="px-6 py-4 text-gray-900 font-medium">
                  {report.campaign}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                    {report.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[report.status]}`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    {report.action === "Retry" ? (
                      <RefreshCw className="w-4 h-4" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    {report.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
