import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import ErrorAlert from "../components/ErrorAlert";
import LoadingSpinner from "../components/LoadingSpinner";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Profile form
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Fetch user profile
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/profile");
      setFormData({
        name: response.data.name,
        email: response.data.email
      });
    } catch (err) {
      console.error("Profile fetch error:", err);
      if (err.response?.status === 401) {
        setError("Session expired - please login again 🔐");
      } else if (err.code === "ERR_NETWORK") {
        setError("Cannot connect to server - is it running? 🔌");
      } else {
        setError(err.response?.data?.message || "Failed to load profile - please try again 💔");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle profile form change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password form change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit profile update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required");
      return;
    }

    try {
      setUpdating(true);
      setError("");
      await API.put("/profile", {
        name: formData.name,
        email: formData.email
      });
      setError("Profile updated successfully! ✨");
      setTimeout(() => setError(""), 3000);
    } catch (err) {
      console.error("Profile update error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to update profile - please try again 💔");
      }
    } finally {
      setUpdating(false);
    }
  };

  // Submit password change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setError("All password fields are required");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      setUpdating(true);
      setError("");
      await API.put("/profile/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setError("Password changed successfully! ✨");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setShowPasswordForm(false);
      setTimeout(() => setError(""), 3000);
    } catch (err) {
      console.error("Password change error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to change password - please try again 💔");
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading your profile..." />;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">💕 My Profile</h1>

        {error && (
          error.includes("successfully") ? (
            <div className="success-alert">{error}</div>
          ) : (
            <ErrorAlert 
              message={error} 
              onDismiss={() => setError("")}
            />
          )
        )}

        {/* Profile Form */}
        <form onSubmit={handleProfileSubmit} className="profile-form">
          <h2 className="form-subtitle">Personal Information</h2>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleProfileChange}
              placeholder="Enter your full name"
              disabled={updating}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleProfileChange}
              placeholder="Enter your email"
              disabled={updating}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* Password Form Toggle */}
        <button 
          type="button" 
          className="btn-text-secondary"
          onClick={() => setShowPasswordForm(!showPasswordForm)}
        >
          {showPasswordForm ? "Cancel Password Change" : "Change Password"}
        </button>

        {/* Password Form */}
        {showPasswordForm && (
          <form onSubmit={handlePasswordSubmit} className="profile-form password-form">
            <h2 className="form-subtitle">Change Password</h2>

            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  disabled={updating}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasswords(prev => ({
                    ...prev,
                    current: !prev.current
                  }))}
                >
                  {showPasswords.current ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  disabled={updating}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasswords(prev => ({
                    ...prev,
                    new: !prev.new
                  }))}
                >
                  {showPasswords.new ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  disabled={updating}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasswords(prev => ({
                    ...prev,
                    confirm: !prev.confirm
                  }))}
                >
                  {showPasswords.confirm ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-secondary" 
              disabled={updating}
            >
              {updating ? "Changing..." : "Change Password"}
            </button>
          </form>
        )}

        {/* Back Button */}
        <button 
          type="button" 
          className="btn-text-back"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
