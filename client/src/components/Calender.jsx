import React, { useEffect, useState } from "react";
import "./Calender.css";
import axios from "axios";

const base_url = "https://task-tracker-cn3a.onrender.com";

const Calendar = ({id, taskRender}) => {

  const [completedDays, setCompletedDays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  async function getCompletionDays() {
    const cDays = [];
    let days = await axios.get(`${base_url}/${id}/completionDays/`)
    days = days.data.data;
    days.map((day) => {
      cDays.push(day.substring(0, 10));
    })
    setCompletedDays(cDays);
  }

  const changeMonth = (offset) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const status = (day) => {
    let today = new Date().toISOString().split('T')[0].split('-');
    let check_day = new Date(year, month, day + 1).toISOString().split('T')[0].split('-');
    today = `${today[0]}-${today[1]}-${today[2]}`
    check_day = `${check_day[0]}-${check_day[1]}-${check_day[2]}`
    if (check_day > today) {
      return "future";
    }
    if (completedDays.includes(check_day)) {
      return "completed";
    } else {
      return "missed";
    }
  }

  const updateTask = async (day) => {
    let clicked_day = new Date(year, month, day + 1).toISOString().split('T')[0];
    let today = new Date().toISOString().split('T')[0];

    if(completedDays.includes(today))return;
    if (clicked_day != today) return;
    const update = prompt("Did you complete???");
      
    if (update) {
      const response = await axios.post(`${base_url}/${id}/completionDays/add`,
        {
          date: clicked_day
        }
      )
      await getCompletionDays();
      taskRender();
      return;
    }
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = new Date(year, month, 1).getDay();

  useEffect(() => {
    getCompletionDays();
  }, [])

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>◀</button>
        <h3>{currentDate.toLocaleString("default", { month: "long" })} {year}</h3>
        <button onClick={() => changeMonth(1)}>▶</button>
      </div>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="day-header">{day}</div>
        ))}
        {Array(firstDayIndex).fill(null).map((_, i) => <div key={`empty-${i}`} className="empty-day"></div>)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div onClick={() => { updateTask(day) }} key={day} className={status(day)}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
