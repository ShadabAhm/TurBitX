// AppLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ThemeSwitcher from "../theme/ThemeSwitcher";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("trubitx_user");
    navigate("/login");
  };

  return (
    <div className="app-layout flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        handleLogout={handleLogout}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
        {/* <ThemeSwitcher /> */}
      </div>
    </div>
  );
};

export default AppLayout;
