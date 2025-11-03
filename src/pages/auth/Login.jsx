import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/brand-logo2.png";

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setBackendError("");
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username_or_email: formData.email, password: formData.password }),
        credentials: "include", // needed for cookie (refresh_token)
      });

      const data = await response.json();

      if (!response.ok) {
        setBackendError(data.detail || "Login failed");
        return;
      }

      // Save access token locally (or session)
      const storage = formData.rememberMe ? localStorage : sessionStorage;
      storage.setItem("trubitx_auth", "true");
      storage.setItem("trubitx_access_token", data.access_token);
      storage.setItem("trubitx_user", JSON.stringify({ email: formData.email }));

      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setBackendError("Unable to login. Try again later.");
    }
  };

  const handleForgotPassword = () => navigate("/forgot-password");

  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="p-8 text-center">
          <img src={logo} alt="TruBitX Logo" className="w-60 h-30 object-contain mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Sign in to TruBitX</h1>
          <p className="text-gray-500">Access your social intelligence dashboard</p>
        </div>

        {/* Backend error */}
        {backendError && <p className="text-red-500 text-sm text-center mb-2">{backendError}</p>}

        {/* Form */}
        <form onSubmit={handleLogin} className="px-8 space-y-5">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointe"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="w-4 h-4 mr-2" />
              Remember me
            </label>
            <button type="button" onClick={handleForgotPassword} className="text-primary cursor-pointe text-sm">
              Forgot password?
            </button>
          </div>

          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg cursor-pointer transition font-medium">
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="px-8 py-6 text-center border-t border-gray-100 mt-6">
          <span className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <button onClick={() => navigate("/register")} className="text-primary cursor-pointe font-medium">
              Create account
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
