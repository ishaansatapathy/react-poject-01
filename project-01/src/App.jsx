import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // 🔹 States
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER"
  });

  // 🔹 Check logged-in user when app loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://api.freeapi.app/api/v1/users/current-user",
          {
            method: "GET",
            headers: {
              accept: "application/json"
            }
          }
        );

        const data = await response.json();

        if (response.ok && data.data) {
          setUser(data.data);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setIsAuthLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔹 Clear messages
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // 🔹 Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 🔹 Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json"
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Fetch current user after login
      const currentUserResponse = await fetch(
        "https://api.freeapi.app/api/v1/users/current-user",
        {
          method: "GET",
          headers: {
            accept: "application/json"
          }
        }
      );

      const currentUserData = await currentUserResponse.json();

      if (currentUserResponse.ok && currentUserData.data) {
        setUser(currentUserData.data);
        setSuccess("Login successful!");
        setFormData({ username: "", email: "", password: "", role: "USER" });
      } else {
        setError("Failed to fetch user data after login");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json"
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: formData.role || "USER"
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Registration successful! Please log in.");
      setFormData({ username: "", email: "", password: "", role: "USER" });
      setIsRegisterMode(false);
    } catch (error) {
      console.error("Register error:", error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await fetch(
        "https://api.freeapi.app/api/v1/users/logout",
        {
          method: "POST",
          headers: {
            accept: "application/json"
          }
        }
      );

      setUser(null);
      setSuccess("Logged out successfully!");
      setFormData({ username: "", email: "", password: "", role: "USER" });
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message || "Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // User authenticated - show profile
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">
                  {user.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
            </div>

            {/* User Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Username</p>
                <p className="text-lg font-semibold text-gray-800">{user.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-lg font-semibold text-gray-800 break-all">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Role</p>
                <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {user.role || "USER"}
                </span>
              </div>
            </div>

            {/* Messages */}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded">
                <p className="text-green-800">{success}</p>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              {isLoading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated - show auth forms
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto mt-20">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">FreeAuth</h1>
            <p className="text-gray-600">
              {isRegisterMode ? "Create a new account" : "Sign in to your account"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
              <p className="text-green-800">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={isRegisterMode ? handleRegister : handleLogin} className="space-y-4 mb-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                required
              />
            </div>

            {/* Email - Only for Register */}
            {isRegisterMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                  required={isRegisterMode}
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                required
              />
              {isRegisterMode && (
                <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
              )}
            </div>

            {/* Role - Only for Register */}
            {isRegisterMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200 mt-6"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  {isRegisterMode ? "Registering..." : "Signing in..."}
                </span>
              ) : (
                isRegisterMode ? "Register" : "Login"
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-3">
              {isRegisterMode ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setError("");
                setSuccess("");
                setFormData({ username: "", email: "", password: "", role: "USER" });
              }}
              disabled={isLoading}
              className="text-indigo-600 hover:text-indigo-700 font-semibold disabled:text-gray-400 transition"
            >
              {isRegisterMode ? "Login here" : "Register here"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Using FreeAPI Authentication</p>
        </div>
      </div>
    </div>
  );
}

export default App;