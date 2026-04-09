import { useState } from "react";
import API from "../api";
import "./AdminPanel.css";

function AdminPanel() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [view, setView] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin/login", { email, password });
      setToken(res.data.token);
      setError("");
    } catch (err) {
      setError("Invalid admin credentials");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users", { headers: { Authorization: `Bearer ${token}` } });
      setUsers(res.data);
      setView("users");
    } catch {
      setError("Failed to fetch users");
    }
  };

  const fetchReminders = async () => {
    try {
      const res = await API.get("/admin/reminders", { headers: { Authorization: `Bearer ${token}` } });
      setReminders(res.data);
      setView("reminders");
    } catch {
      setError("Failed to fetch reminders");
    }
  };

  const deleteUser = async (id) => {
    await API.delete(`/admin/user/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchUsers();
  };

  const deleteReminder = async (id) => {
    await API.delete(`/admin/reminder/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchReminders();
  };

  if (!token) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="admin-actions">
        <button onClick={fetchUsers}>View Users</button>
        <button onClick={fetchReminders}>View Reminders</button>
        <button onClick={() => setToken("")}>Logout</button>
      </div>
      {view === "users" && (
        <div className="admin-users">
          <h3>All Users</h3>
          <table>
            <thead>
              <tr><th>Name</th><th>Email</th><th>Action</th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td><button onClick={() => deleteUser(u._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {view === "reminders" && (
        <div className="admin-reminders">
          <h3>All Reminders</h3>
          <table>
            <thead>
              <tr><th>Medicine</th><th>Date</th><th>Time</th><th>User</th><th>Action</th></tr>
            </thead>
            <tbody>
              {reminders.map(r => (
                <tr key={r._id}>
                  <td>{r.medicineName}</td>
                  <td>{r.date}</td>
                  <td>{r.time}</td>
                  <td>{r.userId?.name} ({r.userId?.email})</td>
                  <td><button onClick={() => deleteReminder(r._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default AdminPanel;
