// components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import logo from "../../assets/brand-logo2.png";


const Register = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    company: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setBackendErrors({});
    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = await authService.register(formData);

      // Auto-login after registration
      authService.setToken(data.access_token, true);
      authService.setUser(data, true);

      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.detail && Array.isArray(err.response.data.detail)) {
        const formattedErrors = {};
        err.response.data.detail.forEach((error) => {
          const field = error.loc[1];
          formattedErrors[field] = error.msg;
        });
        setBackendErrors(formattedErrors);
      } else {
        setBackendErrors({ general: err.response?.data?.detail || "Registration failed" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleRegister} className="bg-white shadow-md rounded-xl p-4 w-full max-w-md">
          <img src={logo} alt="TruBitX Logo" className="w-70 h-30 object-contain mx-auto" />        
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-600">
          Create an Account
        </h2>

        {backendErrors.general && (
          <p className="text-red-500 text-sm text-center mb-4">{backendErrors.general}</p>
        )}

        {/* Form fields remain the same */}
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          {backendErrors.username && <p className="text-red-500 text-sm mt-1">{backendErrors.username}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          {backendErrors.email && <p className="text-red-500 text-sm mt-1">{backendErrors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
        </div>

        <div className="flex items-center mb-4 cursor-pointer">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">I agree to the Terms and Conditions</label>
        </div>
        {errors.agreeToTerms && <p className="text-red-500 text-sm mb-2">{errors.agreeToTerms}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded cursor-pointer transition disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;