import { useState, useEffect, useCallback } from "react";
import API from "../api";
import "./Dashboard.css";
import "../styles/globals.css";

function Dashboard() {
  const [medicine, setMedicine] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchReminders = useCallback(async () => {
    if (!token) {
      setError("No token - please login again");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await API.get("/reminders/all");
      setReminders(res.data || []);
      setError("");
    } catch (error) {
      console.error("Fetch error:", error);
      if (error.response?.status === 401) {
        setError("Session expired - please login again 🔐");
      } else if (error.code === "ERR_NETWORK") {
        setError("Cannot connect to server - is it running? 🔌");
      } else {
        setError("Failed to load reminders - please try again 💔");
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  const addReminder = async (e) => {
    e.preventDefault();

    if (!medicine || !date || !time) {
      setError("Please fill all fields 💕");
      return;
    }

    try {
      setError("");
      await API.post("/reminders/add", {
        medicineName: medicine,
        date,
        time
      });
      fetchReminders();
      setMedicine("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Add error:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.code === "ERR_NETWORK") {
        setError("Connection error - please try again 🌸");
      } else {
        setError("Failed to add reminder 💔");
      }
    }
  };

  const deleteReminder = (id) => {
    if (!confirm("Delete this reminder? 💊")) return;
    
    deleteReminderAPI(id);
  };

  const deleteReminderAPI = async (id) => {
    try {
      await API.delete(`/reminders/${id}`);
      fetchReminders();
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete reminder - please try again 💔");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="spinner heartbeat"></div>
          <p>Loading your reminders 💖</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>My Wellness Dashboard 💕</h2>
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={fetchReminders} className="retry-btn">
            Try Again ✨
          </button>
        </div>
      )}

      <form className="dashboard-form" onSubmit={addReminder}>
        <div>
          <label>Medicine 💊</label>
          <input
            type="text"
            placeholder="e.g., Vitamin D"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
          />
        </div>

        <div>
          <label>Date 📅</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label>Time ⏰</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <button type="submit">
          Add Reminder 💖
        </button>
      </form>

      <div className="dashboard-list">
        {reminders.length === 0 ? (
          <div className="empty-state">
            <div className="reminder-info">
              <strong>No reminders yet ✨</strong>
              <span>Add your first medication above to get started!</span>
            </div>
          </div>
        ) : (
          reminders.map((rem) => (
            <div className="dashboard-list-item" key={rem._id}>
              <div className="reminder-info">
                <strong>{rem.medicineName}</strong>
                <span>{new Date(rem.date).toLocaleDateString()} at {rem.time}</span>
              </div>
              <button 
                onClick={() => deleteReminder(rem._id)}
                className="delete-btn"
                aria-label="Delete reminder"
              >
                Delete 💔
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;

