import React, { useEffect, useState } from "react";
import { Sun, Moon, Monitor, Settings } from "lucide-react";

const ThemeSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme on load and change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Save theme in localStorage
  const handleThemeChange = (mode) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
      >
        <Settings size={22} className="animate-spin-slow" />
      </button>

      {/* Pop-up Panel */}
      {open && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 w-44 transition-all">
          <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Theme Mode
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleThemeChange("light")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                theme === "light"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              <Sun size={16} /> Light
            </button>

            <button
              onClick={() => handleThemeChange("dark")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                theme === "dark"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              <Moon size={16} /> Dark
            </button>

            <button
              onClick={() => handleThemeChange("desktop")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                theme === "desktop"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              <Monitor size={16} /> Desktop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;