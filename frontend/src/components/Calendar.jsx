import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ reminders }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getRemindersForDay = (day) => {
    return reminders.filter(r => {
      const reminderDate = new Date(r.date);
      return reminderDate.getDate() === day && 
             reminderDate.getMonth() === currentMonth && 
             reminderDate.getFullYear() === currentYear;
    });
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => navigateMonth('prev')} className="nav-btn">
          ‹
        </button>
        <h3>{monthNames[currentMonth]} {currentYear}</h3>
        <button onClick={() => navigateMonth('next')} className="nav-btn">
          ›
        </button>
      </div>

      <div className="calendar-grid">
        <div className="calendar-dayname">Sun</div>
        <div className="calendar-dayname">Mon</div>
        <div className="calendar-dayname">Tue</div>
        <div className="calendar-dayname">Wed</div>
        <div className="calendar-dayname">Thu</div>
        <div className="calendar-dayname">Fri</div>
        <div className="calendar-dayname">Sat</div>

        {Array(firstDay).fill().map((_, i) => (
          <div key={`empty-${i}`} className="calendar-empty"></div>
        ))}

        {Array(daysInMonth).fill().map((_, i) => {
          const day = i + 1;
          const dayReminders = getRemindersForDay(day);
          
          return (
            <div key={day} className="calendar-day">
              <div className="day-number">{day}</div>
              {dayReminders.length > 0 && (
                <div className="day-reminders">
                  {dayReminders.slice(0, 3).map(r => (
                    <div key={r._id} className="reminder-dot" title={r.medicineName}></div>
                  ))}
                  {dayReminders.length > 3 && (
                    <div className="more-reminders">+{dayReminders.length - 3}</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

