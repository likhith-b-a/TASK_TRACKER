import React, { useEffect } from "react";
import "./App.css";
//import "./assets/background.css";
import TaskCard from "./components/TaskCard";

function App() {
  return (
    <div className="app">
      <div className="heading">
        <h1 >The 60-Minute DSA Challenge 🔥</h1>
      </div>
      <div className="tasks">
        <TaskCard id={"67a9a53aa504fa6ab6c89515"} />
        <TaskCard id={"67a9a53aa504fa6ab6c89514"} />
        <TaskCard id={"67a9df5fd90ab600c9e0d15b"} />
      </div>
    </div>
  );
}

export default App;

