import { useState, useEffect } from "react";
import API from "../api";
import ErrorAlert from "../components/ErrorAlert";
import LoadingSpinner from "../components/LoadingSpinner";
import "./AdminPanel.css";

function AdminPanel() {
  const [token, setToken] = useState(() => localStorage.getItem("adminToken") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [view, setView] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [statsLoaded, setStatsLoaded] = useState(false);

  // Background fetch for dashboard stats
  const fetchStatsSilent = async () => {
    try {
      const [uRes, rRes] = await Promise.all([
        API.get("/admin/users", { headers: { Authorization: `Bearer ${token}` } }),
        API.get("/admin/reminders", { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setUsers(uRes.data);
      setReminders(rRes.data);
      setStatsLoaded(true);
    } catch(err) {
      console.error("Dashboard stats error:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin/login", { email, password });
      setToken(res.data.token);
      localStorage.setItem("adminToken", res.data.token);
      setError("");
    } catch (err) {
      setError("Invalid admin credentials");
    }
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("adminToken");
    setView("");
    setUsers([]);
    setReminders([]);
    setStatsLoaded(false);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("adminToken", token);
      fetchStatsSilent(); // Load initial lengths for overview
    }
  }, [token]);

  const goToOverview = () => {
    setView("");
    fetchStatsSilent(); // Refresh stats when returning to overview
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/admin/users", { headers: { Authorization: `Bearer ${token}` } });
      setUsers(res.data);
      setView("users");
    } catch {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchReminders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/admin/reminders", { headers: { Authorization: `Bearer ${token}` } });
      setReminders(res.data);
      setView("reminders");
    } catch {
      setError("Failed to fetch reminders");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user? This cannot be undone.");
    if (!confirm) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await API.delete(`/admin/user/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess("User deleted successfully.");
      fetchUsers(); // Refresh Users table
    } catch {
      setError("Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  const deleteReminder = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this reminder?");
    if (!confirm) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await API.delete(`/admin/reminder/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess("Reminder deleted successfully.");
      fetchReminders(); // Refresh Reminders table
    } catch {
      setError("Failed to delete reminder.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="admin-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-icon">
            <span role="img" aria-label="Admin">👩‍💻</span>
          </div>
          <h2>Admin Login</h2>
          <div className="admin-login-subtitle">Welcome, please sign in to continue</div>
          <form className="admin-login-form" onSubmit={handleLogin}>
            <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button className="admin-submit-btn" type="submit">Login to Dashboard</button>
          </form>
          {error && <ErrorAlert message={error} onDismiss={() => setError("")} />}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrapper dashboard-mode">
      <header className="admin-header">
        <div className="admin-brand">💖 Admin Dashboard</div>
        <div className="admin-nav-actions">
          <button className={`admin-nav-btn ${view === '' ? 'active' : ''}`} onClick={goToOverview}>Overview</button>
          <button className={`admin-nav-btn ${view === 'users' ? 'active' : ''}`} onClick={fetchUsers}>View Users</button>
          <button className={`admin-nav-btn ${view === 'reminders' ? 'active' : ''}`} onClick={fetchReminders}>View Reminders</button>
          <button className="admin-logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </header>

      <div className="admin-dashboard-content">
        {success && <div className="admin-success-msg">{success}</div>}
        {error && <ErrorAlert message={error} onDismiss={() => setError("")} />}
        {loading && <LoadingSpinner message="Loading admin data..." />}

        {view === "" && !loading && (
          <div className="admin-overview fade-in">
            <div className="welcome-banner">
              <div className="welcome-text">
                <h2>Welcome back, Admin! 👋</h2>
                <p>Here is the overview of the MedReminder system today.</p>
              </div>
              <div className="welcome-illustration">✨</div>
            </div>
            
            <div className="stats-container">
              <div className="stat-card" onClick={fetchUsers}>
                <div className="stat-icon-wrapper users">
                  <span className="stat-icon" role="img" aria-label="Users">👥</span>
                </div>
                <div className="stat-info">
                  <p className="stat-label">Total Users</p>
                  <h3 className="stat-value">{statsLoaded ? users.length : '-'}</h3>
                </div>
                <div className="stat-action">View details ➔</div>
              </div>
              
              <div className="stat-card" onClick={fetchReminders}>
                <div className="stat-icon-wrapper reminders">
                  <span className="stat-icon" role="img" aria-label="Reminders">⏰</span>
                </div>
                <div className="stat-info">
                  <p className="stat-label">Active Reminders</p>
                  <h3 className="stat-value">{statsLoaded ? reminders.length : '-'}</h3>
                </div>
                <div className="stat-action">View details ➔</div>
              </div>

              <div className="stat-card system-status">
                <div className="stat-icon-wrapper system">
                  <span className="stat-icon" role="img" aria-label="System">🖥️</span>
                </div>
                <div className="stat-info">
                  <p className="stat-label">System Status</p>
                  <h3 className="stat-value status-online">🟢 Online</h3>
                </div>
                <div className="stat-action">Server healthy</div>
              </div>
            </div>
          </div>
        )}

        {view === "users" && !loading && (
          <div className="fade-in">
            <h3>Registered Users ({users.length})</h3>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan="3" style={{textAlign: "center", padding: "2rem", color: "#888"}}>No users found.</td></tr>
                  ) : (
                    users.map(u => (
                      <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td><button className="action-btn-delete" onClick={() => deleteUser(u._id)}>Delete User</button></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === "reminders" && !loading && (
          <div className="fade-in">
            <h3>Active Reminders ({reminders.length})</h3>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr><th>Medicine Name</th><th>Date</th><th>Time</th><th>User Account</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {reminders.length === 0 ? (
                    <tr><td colSpan="5" style={{textAlign: "center", padding: "2rem", color: "#888"}}>No active reminders.</td></tr>
                  ) : (
                    reminders.map(r => (
                      <tr key={r._id}>
                        <td>{r.medicineName}</td>
                        <td>{r.date}</td>
                        <td>{r.time}</td>
                        <td>{r.userId?.name} ({r.userId?.email})</td>
                        <td><button className="action-btn-delete" onClick={() => deleteReminder(r._id)}>Delete Reminder</button></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
