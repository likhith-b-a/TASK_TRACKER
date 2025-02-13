import React, { useEffect, useState } from "react";
import "./TaskCard.css";
import Calendar from "./Calender.jsx";
import axios from "axios";

const base_url = "https://task-tracker-cn3a.onrender.com";

const TaskCard = ({id}) => {

  const [task, setTask] = useState([]);
  
  const fetchDetails = async () => {
    const response = await axios.get(`${base_url}/${id}/details`)
    setTask(response.data.data);
  }
  const fetchStreak = async () => {
    const response = await axios.get(`/api/${id}/streak`)
    console.log(response.data);
  }

  useEffect(() => {
    fetchDetails()
    fetchStreak()
  }, [])

  const getStreak = ()=> {
    fetchStreak();
    if(task.streak == 0){
      return "I am too Lazy";
    }else if(task.streak == 1){
      return '🔥'+task.streak + "day";
    }else{
      return '🔥'+task.streak + "days";
    }
  }

  return (
    <div className="taskContainer">
      <div className="task-card" >
        <div className="top-part">
          <div className="photo-container">
            <img src={task.image} alt="Task" className="task-photo" />
            <div className="user-details">
              {
                task.details?.map((detail, index)=>{
                  return <p key={index} >{"⭐ "+detail}</p>
                })
              }
            </div>
          </div>
          <Calendar id={id} taskRender = {fetchDetails} />
        </div>
        <div className="task-info">
          <h3>{task.title}</h3>
          <p className="desc">{task.description}</p>
          <div className="streak">
            <p className="streak"><strong>Streak:</strong> 
              {getStreak()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
